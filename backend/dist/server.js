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
app.use(express_1.default.json());
const express_2 = require("@clerk/express");
// Middleware to protect routes and sync Clerk user to NeonDB
const authenticate = [
    (0, express_2.requireAuth)(),
    async (req, res, next) => {
        const auth = req.auth;
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
                user = await prisma.user.create({
                    data: {
                        id: auth.userId,
                        email,
                        name,
                    }
                });
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
    // Dashboard requires specific aggregated logic, we mock the real-time scoring logic
    // but we can fetch actual activities from DB
    const activities = await prisma.activity.findMany({ take: 3, orderBy: { id: 'desc' } });
    res.json({
        user: { name: user?.name, email: user?.email },
        scoreData: [
            { name: 'Mon', score: 65 },
            { name: 'Tue', score: 68 },
            { name: 'Wed', score: 70 },
            { name: 'Thu', score: 72 },
            { name: 'Fri', score: 78 },
            { name: 'Sat', score: 82 },
            { name: 'Sun', score: 85 },
        ],
        stats: [
            { label: "Skin Score", value: "85/100", trend: "+12%", iconName: "Activity", color: "text-emerald-500" },
            { label: "Next AI Checkup", value: "Tomorrow, 10 AM", trend: "DermAI v4", iconName: "Bot", color: "text-amber-500" },
            { label: "Scan Precision", value: "98.2%", trend: "High Confidence", iconName: "ScanSearch", color: "text-blue-500" },
            { label: "Consultation Status", value: "Available", trend: "Dr. AI Ready", iconName: "MessageSquareHeart", color: "text-primary-500" },
        ],
        activities
    });
});
app.post('/api/analyze', authenticate, (req, res) => {
    // Simulate AI Analysis Processing
    setTimeout(() => {
        res.json({
            status: "success",
            reportId: "#DW-88492",
            condition: "Moderate Plaque Psoriasis",
            severity: 65,
            area: "Forearm",
            recommendations: ["consultation"]
        });
    }, 2000);
});
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
