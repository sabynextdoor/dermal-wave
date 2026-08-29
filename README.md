# 🌊 Dermal Wave — AI Skin Analysis Platform

![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-blue) ![License](https://img.shields.io/badge/License-MIT-blue)

Real-time AI skin condition detection and tracking platform by saby. Upload a photo, get a clinical-grade AI analysis, chat with specialized AI dermatologists, and track your progress on your dashboard.

**Stack:** Next.js 16 (frontend) · Express 5 + Prisma 5 (backend) · PostgreSQL · Clerk (auth) · Google Gemini (AI)

---

## 🖼️ Screenshots

| Landing Page |
| :--- |
| ![Dermal Wave Landing](screenshots/landing.png) |

_Screenshots of the Dashboard, AI Analysis, and AI Consultant pages will be added here once the app is running with real Clerk + Gemini credentials (those routes require an authenticated session)._

---

## ✅ Prerequisites

Before you begin you need:

1. **Node.js 18+** and **npm**
2. **PostgreSQL** (local install, e.g. 16/18 on Windows, or a hosted Neon DB)
3. **A Clerk account** — free at [dashboard.clerk.com](https://dashboard.clerk.com). Create an application to get your **Publishable Key** and **Secret Key** (their values start with `pk_` and `sk_` respectively).
4. **A Google Gemini API key** — free at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

> The app will not function without valid Clerk keys (auth) and a Gemini key (AI analysis / chat). The database is required for all data persistence.

---

## 🗄️ 1. Database Setup

Create a database (local PostgreSQL example):

```bash
# Using the postgres superuser (adjust user/password to your install)
psql -U postgres -h localhost -c "CREATE DATABASE dermalweave;"
```

Then, from the `backend` folder, create the tables and seed demo data:

```bash
cd backend
npm install
cp .env.example .env          # then edit .env (see below)
npm run db:push               # creates the Prisma schema in PostgreSQL
npm run db:seed               # inserts 3 AI consultants + demo user/activity
```

---

## ⚙️ 2. Backend Environment (`backend/.env`)

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/dermalweave"

CLERK_SECRET_KEY="PASTE_YOUR_CLERK_SECRET_KEY_HERE"       # from Clerk dashboard
CLERK_PUBLISHABLE_KEY="PASTE_YOUR_CLERK_PUBLISHABLE_KEY_HERE" # from Clerk dashboard

GEMINI_API_KEY="PASTE_YOUR_GEMINI_API_KEY_HERE"           # from Google AI Studio

JWT_SECRET="super-secret-dermalwave-key"
```

> Prefer the exact database name you created in step 1. For a hosted Neon DB, paste the full `postgresql://...?...sslmode=require` connection string.

---

## 🚀 3. Run the Backend

```bash
cd backend
npm run dev          # http://localhost:5000
```

You should see: `Backend server running on http://localhost:5000`

To run the compiled build instead:

```bash
npm run build
npm run start
```

---

## 🖥️ 4. Frontend Environment (`frontend/.env.local`)

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="PASTE_YOUR_CLERK_PUBLISHABLE_KEY_HERE"  # from Clerk dashboard
CLERK_SECRET_KEY="PASTE_YOUR_CLERK_SECRET_KEY_HERE"                         # from Clerk dashboard

# Optional — only needed if your backend is NOT on http://localhost:5000
# NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

> Without a real `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, sign-in and protected routes (`/dashboard`, `/analysis`) will not work.

---

## 💻 5. Run the Frontend

```bash
cd frontend
npm install
npm run dev          # http://localhost:3000
```

Open http://localhost:3000, sign in with your Clerk account, and you're ready:
- **AI Analysis** — upload a skin photo for a Gemini-powered clinical report
- **Dashboard** — view scan history, skin score trend, and activity
- **AI Consultants** — chat with dermatology-focused AI specialists
- **Settings** — manage your Clerk profile

---

## 🔌 API Endpoints (all require a Clerk bearer token)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET  | `/api/consultants` | List AI consultants |
| GET  | `/api/user/profile` | Get current user profile |
| PUT  | `/api/user/profile` | Update current user profile |
| GET  | `/api/dashboard` | Dashboard stats, scan trend, activities |
| POST | `/api/analyze` | Analyze an uploaded skin image (`imageBase64`, `mimeType`, `duration`, `symptoms`) |
| POST | `/api/chat` | Chat with an AI dermatologist (`messages` array) |

The frontend calls these through `frontend/src/lib/api.ts`, which sends the Clerk token in the `Authorization: Bearer` header. The backend auto-creates/syncs your Clerk user into PostgreSQL on the first authenticated request.

---

## 🐛 Troubleshooting

| Problem | Solution |
| :--- | :--- |
| API returns `503` "Clerk authentication is not configured" | Set `CLERK_SECRET_KEY` + `CLERK_PUBLISHABLE_KEY` in `backend/.env`, restart backend |
| Analysis / chat fail with "Gemini API key is not configured" | Set `GEMINI_API_KEY` in `backend/.env`, restart backend |
| `db:push` fails to connect | Make sure PostgreSQL is running and `DATABASE_URL` is correct |
| Frontend can't reach the API | Confirm the backend is on `:5000`, or set `NEXT_PUBLIC_API_URL` |
| Port 5000 in use | Change `PORT` in `backend/.env` and update `NEXT_PUBLIC_API_URL` |

---

## 📄 License

MIT — see the [LICENSE](LICENSE) file.

## 🙏 Acknowledgments

Open Source Community · Healthcare Professionals · Gemini & Clerk. Thanks by saby. Made with ❤️ for modern healthcare.
