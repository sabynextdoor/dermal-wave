<div align="center">

# 🌊 Dermal Wave

### AI-Powered Skin Analysis & Smart Therapeutic Garments

A full-stack, production-grade platform that lets users **upload a skin photo for a clinical-grade AI analysis**, **chat with specialized AI dermatologists**, and **track their skin-health progress** — all powered by **Google Gemini** and secured by **Clerk authentication**.

![Next.js](https://img.shields.io/badge/Next.js%2016-black?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express%205-000000?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk%20Auth-6C47FF?logo=clerk)
![Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?logo=googlegemini&logoColor=white)

**Frontend** · Next.js 16 (App Router) · Tailwind · Framer Motion · Clerk **·** **Backend** · Express 5 · Prisma 5 · **@google/genai** · **Database** · PostgreSQL

</div>

---

## 📸 Screenshots

| Landing Page | AI Skin Analysis |
| :---: | :---: |
| ![Dermal Wave Landing Page](screenshots/landing.png) | ![AI Skin Analysis](screenshots/analysis.png) |

> Protected pages (AI Analysis, Dashboard, AI Consultant chat) require an authenticated session — capture them after signing in with your own Clerk account.

---

## ✨ Features

- 🩺 **AI Skin Analysis** — Upload a photo; Google Gemini produces a structured clinical report (condition, severity 0–100, affected area, and recommendations including natural/traditional remedies).
- 💬 **AI Dermatologist Chat** — Chat with specialized, dermatology-only AI consultants with a strict medical guardrail.
- 🧑‍⚕️ **3 Specialized Consultants** — DermAI, PsoriaGen, and PediSkin — each seeded as a distinct virtual specialist.
- 📊 **Dashboard** — Real skin-score trend, scan history, and activity feed (auto-provisioned from your Clerk identity).
- 🔐 **Secure Authentication** — Clerk-powered sign-up/sign-in, protected routes, and session-backed API authorization (Bearer tokens).
- 🗄️ **PostgreSQL + Prisma** — Relational persistence with a clean schema, easy migrations, and a demo seeder.
- ⚡ **Blazing fast uploads** — Images are client-side compressed (max 512px) before analysis.
- 🔁 **Resilient AI calls** — Automatic retry + exponential backoff handles Gemini's free-tier rate limits.
- 🧵 **Smart therapeutic garments** — Product catalogue, tracking, and AI-consultant flow (demo commerce).

---

## 🏗️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| Frontend | Next.js 16 (App Router), TypeScript, Tailwind CSS, Framer Motion, Clerk (`@clerk/nextjs`) |
| Backend | Express 5, TypeScript, Prisma 5, Clerk (`@clerk/express`), Google Gemini (`@google/genai`) |
| Database | PostgreSQL (local or NeonDB) |
| Auth | Clerk (email/password, Google, etc.) |
| AI | Google Gemini (`gemini-3.6-flash`) |

---

## 🗂️ Repository Layout

```
dermalweave/
├── frontend/            # Next.js 16 app (App Router)
│   ├── src/app/         # Pages: landing, analysis, dashboard, consultants, sign-in/up
│   ├── src/components/  # Reusable UI components
│   ├── src/lib/         # API client, mock data, utils
│   ├── src/proxy.ts     # Clerk middleware (protects /dashboard + /analysis)
│   └── .env.example     # Required env vars (copy to .env.local)
├── backend/             # Express 5 + Prisma 5 API
│   ├── src/server.ts    # App, routes, auth, Gemini integration
│   ├── prisma/          # Schema + seed
│   └── .env.example     # Required env vars (copy to .env)
└── screenshots/         # README screenshots
```

---

## ✅ Prerequisites

Before you begin, install:

1. **Node.js 18+** and **npm** — [nodejs.org](https://nodejs.org)
2. **PostgreSQL 14+** — [postgresql.org](https://www.postgresql.org/download/), or use a free hosted **Neon** database.
3. **A Clerk account** — free at [dashboard.clerk.com](https://dashboard.clerk.com). Create an application to get your **Publishable Key** (`pk_test_...`) and **Secret Key** (`sk_test_...`).
4. **A Google Gemini API key** — free at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey). Keys starting with `AIza...` (legacy) **or** `AQ.Ab...` (new auth keys) are supported.

> ⚠️ The app **will not function** without valid Clerk keys (authentication) and a Gemini key (AI analysis/chat). PostgreSQL is required for all data persistence.

> ## 🔑 Important — bring your own keys
>
> This repository does **not** include any working keys. Clerk and Google Gemini are **per-account** credentials that **you must create and own** — they are never committed to this repo, and they cannot be shared or "just work" after cloning.
>
> - **Clerk keys** (`pk_test_...` / `sk_test_...`) → create a free application at [dashboard.clerk.com](https://dashboard.clerk.com).
> - **Gemini key** (`AIza...` or `AQ.Ab...`) → create a free key at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).
>
> Paste your values into your local `backend/.env` and `frontend/.env.local` (both are gitignored). If authentication or AI analysis fails after cloning, it is because **your** keys are missing or misconfigured — review the Troubleshooting section below.

---

## 🚀 Quick Start

### 1. Clone & install dependencies

```bash
git clone https://github.com/sabynextdoor/dermalweave.git
cd dermalweave

cd backend && npm install
cd ../frontend && npm install
```

### 2. Create the database

```bash
# Local PostgreSQL (adjust user/password to your install)
psql -U postgres -h localhost -c "CREATE DATABASE dermalweave;"
```

### 3. Configure the backend (`backend/.env`)

Copy the example and fill in your real values:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/dermalweave"
CLERK_SECRET_KEY="sk_test_..."          # from Clerk dashboard
CLERK_PUBLISHABLE_KEY="pk_test_..."     # from Clerk dashboard
GEMINI_API_KEY="AIza..."               # from Google AI Studio
```

### 4. Push the schema & seed

```bash
cd backend
npm run db:push      # creates tables
npm run db:seed      # inserts 3 AI consultants + demo data
```

### 5. Configure the frontend (`frontend/.env.local`)

```bash
cd frontend
cp .env.example .env.local
```

Edit `frontend/.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."   # from Clerk dashboard
CLERK_SECRET_KEY="sk_test_..."                    # from Clerk dashboard
# NEXT_PUBLIC_API_URL="http://localhost:5000/api"  # optional override
```

> ⚠️ The **frontend and backend must use the same Clerk application** (same `sk_test_...`), otherwise the backend cannot verify the frontend's session tokens.

### 6. Run the backend

```bash
cd backend
npm run dev      # http://localhost:5000
```

You should see: `Backend server running on http://localhost:5000`

### 7. Run the frontend

```bash
cd frontend
npm run dev      # http://localhost:3000
```

Open **http://localhost:3000**, sign in with your Clerk account, and you're ready to go!

---

## 🧭 Using the App

| Page | What it does |
| :--- | :--- |
| **AI Analysis** | Upload a skin photo → get a structured AI clinical report. |
| **Dashboard** | View your skin-score trend, scan history, and activity. |
| **AI Consultants** | Chat with DermAI, PsoriaGen, or PediSkin — dermatology-only AI specialists. |
| **Settings** | Manage your Clerk profile. |

---

## 🔌 API Reference

All endpoints require a **Clerk Bearer token** in the `Authorization` header. The frontend attaches it automatically via `frontend/src/lib/api.ts`.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/consultants` | List AI consultants |
| `GET` | `/api/user/profile` | Get the current user's profile |
| `PUT` | `/api/user/profile` | Update the current user's profile |
| `GET` | `/api/dashboard` | Dashboard stats, score trend, and activity |
| `POST` | `/api/analyze` | Analyze a skin image. Body: `{ imageBase64, mimeType, duration, symptoms }` |
| `POST` | `/api/chat` | Chat with an AI dermatologist. Body: `{ messages: [{ role, text }] }` |

The backend **auto-creates and syncs** your Clerk user into PostgreSQL on the first authenticated request.

---

## 🛠️ Environment Variables Summary

### Backend (`backend/.env`)
| Variable | Required | Description |
| :--- | :---: | :--- |
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `CLERK_SECRET_KEY` | ✅ | Clerk secret key (server-side) |
| `CLERK_PUBLISHABLE_KEY` | ✅ | Clerk publishable key |
| `GEMINI_API_KEY` | ✅ | Google Gemini API key |
| `JWT_SECRET` | — | Legacy token signature (has a safe default) |

### Frontend (`frontend/.env.local`)
| Variable | Required | Description |
| :--- | :---: | :--- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ | Clerk publishable key |
| `CLERK_SECRET_KEY` | ✅ | Clerk secret key (used by proxy middleware) |
| `NEXT_PUBLIC_API_URL` | — | Backend base URL (defaults to `http://localhost:5000/api`) |

> 🔒 All `.env` / `.env.local` files are **gitignored** — secrets are never committed.

---

## 🧪 Scripts

| Script | Where | Description |
| :--- | :--- | :--- |
| `npm run dev` | backend / frontend | Start dev server with hot reload |
| `npm run build` | backend / frontend | Type-check + production build |
| `npm start` | backend / frontend | Run production build |
| `npm run db:push` | backend | Push Prisma schema to DB |
| `npm run db:seed` | backend | Seed consultants + demo data |
| `npm run lint` | frontend | Run ESLint |
| `npx tsc` | backend / frontend | Type-check only |

---

## ❓ Troubleshooting

| Problem | Solution |
| :--- | :--- |
| API returns `503` "Clerk authentication is not configured" | Set `CLERK_SECRET_KEY` + `CLERK_PUBLISHABLE_KEY` in `backend/.env` and restart the backend. |
| Analysis / chat fail with "Gemini API key is not configured" | Set `GEMINI_API_KEY` in `backend/.env` and restart the backend. |
| Analysis / chat return `500` "This model is experiencing high demand" | Free-tier Gemini rate limit. The app retries automatically with backoff — just wait a few seconds. |
| `npm run db:push` fails to connect | Confirm PostgreSQL is running and `DATABASE_URL` is correct. |
| Frontend can't reach the API | Confirm the backend is on `:5000`, or set `NEXT_PUBLIC_API_URL`. |
| Port already in use | Change `PORT` in `backend/.env` and update `NEXT_PUBLIC_API_URL` accordingly. |
| Sign-in doesn't work in the browser | Ensure the frontend and backend use the **same Clerk application** (same secret key). |

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a pull request.

Please ensure your code passes `npm run build` and `npm run lint` in both packages.

---

## 📄 License

Distributed under the [MIT License](LICENSE). See `LICENSE` for more information.

---

## 🙏 Acknowledgments

Open-source community · Google Gemini · Clerk · Prisma · Next.js. Built with ❤️ for modern healthcare.

<sub>⚠️ **Medical disclaimer:** Dermal Wave is an experimental AI tool for educational purposes. It is **not** a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider.</sub>
