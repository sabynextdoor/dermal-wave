"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-dermalwave-key';
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
const genai_1 = require("@google/genai");
const express_2 = require("@clerk/express");
// Friendly guard so the API returns a clear message instead of a raw 500
// when Clerk credentials have not been configured yet.
const clerkConfigGuard = (_req, res, next) => {
    if (!process.env.CLERK_SECRET_KEY || !process.env.CLERK_PUBLISHABLE_KEY) {
        res.status(503).json({
            error: 'Clerk authentication is not configured.',
            hint: 'Set CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY in backend/.env (see backend/.env.example), then restart the backend.',
        });
        return;
    }
    next();
};
// Middleware to protect routes and sync Clerk user to NeonDB
const authenticate = [
    clerkConfigGuard,
    (0, express_2.clerkMiddleware)(),
    async (req, res, next) => {
        const auth = (0, express_2.getAuth)(req);
        if (!auth || !auth.userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        try {
            // Check if user exists in our DB
            let user = await prisma.user.findUnique({ where: { id: auth.userId } });
            if (!user) {
                // Fetch details from Clerk and create user
                const clerkUser = await express_2.clerkClient.users.getUser(auth.userId);
                const email = clerkUser.emailAddresses[0]?.emailAddress || `${auth.userId}@placeholder.clerk`;
                const name = clerkUser.firstName ? `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim() : 'New User';
                // Check if a user with this email already exists (e.g. they deleted and recreated their Clerk account)
                const existingEmailUser = await prisma.user.findUnique({ where: { email } });
                if (existingEmailUser) {
                    // Update the existing user with the new Clerk ID
                    user = await prisma.user.update({
                        where: { email },
                        data: { id: auth.userId, name }
                    });
                }
                else {
                    // Create a brand new user
                    user = await prisma.user.create({
                        data: {
                            id: auth.userId,
                            email,
                            name,
                        }
                    });
                }
            }
            req.userId = auth.userId;
            next();
        }
        catch (err) {
            console.error("Error provisioning user:", err);
            res.status(500).json({ error: 'Internal server error during auth' });
        }
    }
];
// Protected API Endpoints
app.get('/api/consultants', authenticate, async (req, res) => {
    const consultants = await prisma.aIConsultant.findMany();
    res.json(consultants);
});
app.get('/api/user/profile', authenticate, async (req, res) => {
    const userId = req.userId;
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true, email: true }
    });
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.json(user);
});
app.put('/api/user/profile', authenticate, async (req, res) => {
    const userId = req.userId;
    const { name, email } = req.body;
    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { name, email }
        });
        res.json({ success: true, user });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
});
app.get('/api/dashboard', authenticate, async (req, res) => {
    const userId = req.userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    // Fetch real scans
    const scans = await prisma.scan.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' }
    });
    const scoreData = scans.map((s, idx) => ({
        name: `Scan ${idx + 1}`,
        score: Math.max(0, 100 - s.severity)
    }));
    const avgSeverity = scans.length > 0
        ? Math.round(scans.reduce((acc, s) => acc + s.severity, 0) / scans.length)
        : 0;
    const latestCondition = scans.length > 0 ? scans[scans.length - 1].condition : "None";
    const stats = [
        { label: "Total Scans", value: scans.length.toString(), trend: "Lifetime", iconName: "ScanSearch", color: "text-blue-500" },
        { label: "Average Severity", value: `${avgSeverity}%`, trend: "Lifetime", iconName: "Activity", color: "text-red-500" },
        { label: "Latest Condition", value: latestCondition, trend: "Current", iconName: "Bot", color: "text-emerald-500" }
    ];
    // Fetch real activities
    const activities = await prisma.activity.findMany({
        where: { userId },
        take: 5,
        orderBy: { createdAt: 'desc' }
    });
    const formattedActivities = activities.map((a) => {
        // format time roughly
        const diff = Date.now() - new Date(a.createdAt).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const timeStr = hours < 1 ? "Just now" : hours < 24 ? `${hours} hours ago` : `${Math.floor(hours / 24)} days ago`;
        return {
            ...a,
            time: timeStr
        };
    });
    res.json({
        user: { name: user?.name, email: user?.email },
        scoreData,
        stats,
        activities: formattedActivities
    });
});
app.post('/api/analyze', authenticate, async (req, res) => {
    try {
        const { imageBase64, mimeType, duration, symptoms } = req.body;
        const userId = req.userId;
        if (!imageBase64) {
            res.status(400).json({ error: "No image provided" });
            return;
        }
        if (!process.env.GEMINI_API_KEY) {
            res.status(500).json({ error: "Gemini API key is not configured on the server." });
            return;
        }
        const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const promptText = `
      You are a world-class AI Dermatologist. Your goal is to accurately diagnose the skin condition shown in the image.
      
      PATIENT HISTORY:
      - Duration: ${duration || "Unknown"}
      - Symptoms: ${symptoms || "Unknown"}
      
      Instructions for high accuracy:
      1. Carefully examine the color, texture, shape, borders, and anatomical location of the lesion/rash.
      2. Factor in the PATIENT HISTORY provided above to rule out impossible conditions (e.g. if duration is "Months" but condition is acute).
      3. Perform a brief internal differential diagnosis: consider at least 3 possible conditions it could be, then select the most probable one.
      4. If the image is blurry, too dark, or ambiguous, output a condition like "Inconclusive (Needs better photo)".
      
      KNOWLEDGE BASE (Prioritize this when detecting Psoriasis):
      - Plaque psoriasis: Raised, red patches covered by silvery-white scales. Symmetrical pattern. Often on scalp, trunk, elbows, knees.
      - Guttate psoriasis: Small, red dots, typically on torso or limbs. Often in children/young adults.
      - Pustular psoriasis: Pus-filled bumps (pustules) surrounded by red skin. Usually affects hands and feet.
      - Inverse psoriasis: Smooth, red patches in folds of skin (beneath breasts, groin, armpits).
      - Erythrodermic psoriasis: Rare/severe. Red, scaly skin over most of the body.
      If you detect Psoriasis, specify exactly which of these 5 types it is based on the visuals.
      
      Provide a structured JSON response with the exact following keys:
      - reasoning: A brief 2-sentence explanation of your differential diagnosis and why you selected the final condition.
      - condition: The most likely dermatological condition (be highly specific).
      - severity: A number from 0 to 100 representing the severity of the condition.
      - area: The anatomical area of the skin shown.
      - recommendations: An array of strings with 3-4 recommendations. Crucially, include at least one natural home remedy or traditional alternative medicine (like Siddha medicine, Ayurveda, etc.) alongside clinical advice.
      
      Output ONLY valid JSON and nothing else. No markdown formatting.
    `;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                {
                    role: 'user',
                    parts: [
                        { inlineData: { data: imageBase64, mimeType: mimeType || 'image/jpeg' } },
                        { text: promptText }
                    ]
                }
            ],
            config: {
                responseMimeType: 'application/json'
            }
        });
        const reportText = response.text || "{}";
        const reportJson = JSON.parse(reportText);
        // Save scan to DB
        await prisma.scan.create({
            data: {
                userId,
                condition: reportJson.condition || "Unknown",
                severity: reportJson.severity || 0,
                area: reportJson.area || "Unknown",
                recommendations: reportJson.recommendations || []
            }
        });
        // Create an activity
        await prisma.activity.create({
            data: {
                userId,
                title: "AI Skin Analysis",
                time: "", // We compute this dynamically now
                desc: `Scanned ${reportJson.area || 'an area'} for ${reportJson.condition || 'issues'}.`,
                type: "system"
            }
        });
        res.json({
            status: "success",
            reportId: "#DW-" + Math.floor(Math.random() * 90000 + 10000),
            condition: reportJson.condition || "Unknown",
            severity: reportJson.severity || 0,
            area: reportJson.area || "Unknown",
            recommendations: reportJson.recommendations || []
        });
    }
    catch (error) {
        console.error("Gemini Analysis Error:", error);
        res.status(500).json({ error: "Analysis failed. Please try again later." });
    }
});
app.post('/api/chat', authenticate, async (req, res) => {
    try {
        const { messages } = req.body;
        if (!messages || !Array.isArray(messages)) {
            res.status(400).json({ error: "Invalid messages array" });
            return;
        }
        if (!process.env.GEMINI_API_KEY) {
            res.status(500).json({ error: "Gemini API key is not configured on the server." });
            return;
        }
        const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const systemInstruction = `
      You are an expert AI Dermatologist. 
      You are STRICTLY RESTRICTED to answering questions about psoriasis, skin diseases, dermatology, and skin health. 
      If the user asks about ANY OTHER TOPIC (e.g., coding, politics, general knowledge, math, etc.), you MUST politely but firmly refuse to answer and remind them that you are only capable of discussing skin health.
      Be empathetic, professional, and clear.
    `;
        // Convert our format to Gemini format
        const contents = messages.map((m) => ({
            role: m.role === 'ai' ? 'model' : 'user',
            parts: [{ text: m.text }]
        }));
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                systemInstruction: systemInstruction
            }
        });
        res.json({ text: response.text });
    }
    catch (error) {
        console.error("Gemini Chat Error:", error);
        res.status(500).json({ error: "Chat failed. Please try again later." });
    }
});
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
