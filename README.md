<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Turso-LibSQL-3B82F6?style=for-the-badge" alt="Turso" />
  <img src="https://img.shields.io/badge/Vercel-Deploy-000?style=for-the-badge&logo=vercel" alt="Vercel" />
</p>

---

# 🔗 URL Shortener

An **Open-source** full-stack URL shortener focused on **design**, **performance**, and **usability**. Built with modern Next.js and React patterns.

---

## ✨ Main features

| Feature | Description |
|---------|-------------|
| **Shorten without an account** | Create temporary URLs (1d, 7d, 30d) without signing up. Links are stored in localStorage so you can see them right away. |
| **Sync on sign-in** | When you register or log in, temporary URLs you created anonymously can be migrated to your account in one click. |
| **Permanent URLs with custom slugs** | Signed-in users can create permanent links with a custom slug (e.g. `your-domain.com/my-link`). |
| **Dashboard with metrics** | Total URLs, active, expired, and **total clicks** per link. Table with sorting, search, and pagination. |
| **Usage tracking** | Each redirect updates `usedCount` and `lastUsedAt` so you can see how each link performs. |
| **Light/dark theme** | UI with light and dark mode. |
| **Automatic cleanup** | Vercel Cron job that deletes expired anonymous temporary URLs. |
| **Flexible auth** | Email/password plus OAuth with **GitHub** and **Google** via Better Auth. |

---

## 🛠 Tech stack & techniques

### Frontend & framework

- **Next.js 16** — App Router, Server Components, Server Actions, dynamic `[slug]` routes.
- **React 19** — Latest stable release.
- **TypeScript** — Strict typing across the app.
- **Tailwind CSS 4** — Styling and responsive layout.
- **Shadcn (Radix UI)** — Accessible components (tabs, dropdowns, dialogs, etc.).
- **TanStack React Table** — Dashboard table with sorting, filtering, and pagination.
- **next-themes** — Light/dark theme switching.
- **Sonner** — Toast notifications.
- **Zod** — Form and data validation in Server Actions.

### Backend & data

- **Drizzle ORM** — Type-safe ORM with SQLite/Turso.
- **Turso (LibSQL)** — Edge-ready SQLite database.
- **Better Auth** — Authentication (email/password, GitHub, Google) with Drizzle adapter and Next.js cookies.
- **Server Actions** — Business logic (create short URL, sync, delete) without manual REST APIs.

### Quality & deployment

- **ESLint + Prettier** — Linting and formatting.
- **Husky + lint-staged + Commitlint** — Conventional commits and pre-commit checks.
- **GitHub Actions** — CI (typecheck, lint) on PRs and migration workflow on push to `main`.
- **Vercel** — Hosting and **Cron** for the expired-URL cleanup job.

### Notable techniques

- **Base62 slugs** — Short slug generation (6 characters) for temporary URLs.
- **Zod validation** — Reusable schemas and consistent error messages.
- **DB indexes** — On `userId` and `expiresAt` for fast queries.
- **Cron protection** — Cleanup endpoint secured with `PRIVATE_API_KEY` / `CRON_SECRET`.
- **DTOs & types** — `MinimalShortUrlDTO` and Drizzle-inferred types for clear contracts between layers.

---

## 🚀 Setup

### Requirements

- **Node.js** ≥ 20  
- **pnpm** (recommended; project uses `packageManager: "pnpm@10.30.3"`)

### 1. Clone and install

```bash
git clone https://github.com/sergio-jc/url-shortener.git
cd url-shortener
pnpm install
```

### 2. Environment variables

Copy the sample file and fill in the values:

```bash
cp .env.sample .env
```

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | A sqlite local file or Turso (LibSQL) database URL. |
| `DATABASE_AUTH_TOKEN` | Your data base auth token. (if applied) |
| `BETTER_AUTH_SECRET` | Secret for session signing (Better Auth). |
| `BETTER_AUTH_URL` | Public app URL (e.g. `http://localhost:3000`). |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth (optional). |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth (optional). |
| `PRIVATE_API_KEY` / `CRON_SECRET` | Used to protect the expired-URL cleanup endpoint (cron). |

### 3. Database

Generate and run migrations:

```bash
pnpm run db:generate
pnpm run db:migrate
```

Optional — open Drizzle Studio:

```bash
pnpm run db:studio
```

### 4. Run in development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Useful scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start dev server. |
| `pnpm build` | Production build. |
| `pnpm start` | Start production server (after `build`). |
| `pnpm run typecheck` | Type checking. |
| `pnpm run lint` | Lint the project. |
| `pnpm run format` | Format with ESLint fix. |
| `pnpm run db:generate` | Generate Drizzle migrations. |
| `pnpm run db:migrate` | Run migrations. |
| `pnpm run db:studio` | Open Drizzle Studio. |

---

## 📄 License

This project is under the **MIT License**. You may use, modify, and distribute it under the terms of the license.

---

<p align="center">
  <sub>Built with Next.js, React, and TypeScript</sub>
</p>
