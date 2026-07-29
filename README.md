

# Entrybase

**Entrybase** is a modern, full-stack monorepo designed for building scalable waitlist and signup management applications. It combines a high-performance Next.js frontend, a serverless Cloudflare Workers API, and a Rust/Axum WebSocket server for real-time event streaming. The platform includes built-in authentication, team collaboration, usage analytics, and Stripe billing.

## 📦 Project Structure

This project uses a **pnpm monorepo** powered by **Turborepo** for task orchestration:

```
├── apps/
│   ├── web/          # Next.js 14 frontend dashboard (React, Tailwind, shadcn/ui)
│   ├── workers/      # Cloudflare Workers API (Hono, Drizzle ORM)
│   └── realtime/     # Rust/Axum WebSocket server for live updates
├── internal/
│   ├── db/           # Shared database schema & Drizzle configuration
│   └── id/           # Shared ID generation utilities
└── package.json      # Root workspace & turbo configuration
```

## 🛠 Tech Stack

| Category | Tools & Libraries |
|----------|-------------------|
| **Frontend** | Next.js 14, React, Tailwind CSS, shadcn/ui, Framer Motion, Recharts |
| **Backend/API** | Cloudflare Workers, Hono, Drizzle ORM, PostgreSQL (Neon) |
| **Realtime** | Rust, Axum, Tokio, WebSocket, Fly.io |
| **Auth & Billing** | Clerk (Authentication & Organizations), Stripe (Subscriptions & Invoicing) |
| **DevOps & Tooling** | pnpm, Turborepo, Biome, Husky, Wrangler, Flyctl, Infisical (Secrets) |

## 📋 Prerequisites

- **Node.js** `18.x` or higher
- **pnpm** `9.x` (`npm i -g pnpm`)
- **Rust Toolchain** (`rustup install stable`)
- **Fly.io CLI** (`brew install flyctl` or follow Fly docs)
- **Wrangler** (`npm i -g wrangler`)
- **Infisical CLI** (for environment secret management, optional but recommended)

## 🚀 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/aabassiouni/entrybase.git
   cd entrybase
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp apps/web/.env.example apps/web/.env.local
   cp apps/realtime/.env.development apps/realtime/.env.development
   ```
   Populate the required keys (Clerk, Stripe, Neon Database, Upstash Redis, etc.). Infisical is integrated for secure secret management across environments.

4. Sync the database schema:
   ```bash
   pnpm db:migrate  # or pnpm db:push
   ```

## 💻 Development

Run the full monorepo in development mode:
```bash
pnpm dev
```

Or run individual apps:
```bash
# Frontend (Next.js)
cd apps/web && pnpm dev

# Realtime WebSocket Server (Rust)
cd apps/realtime && pnpm dev

# Cloudflare Workers API
cd apps/workers && pnpm dev
```

## 🌍 Deployment

Deployments are automated via GitHub Actions:

| App | Environment | Platform | Trigger |
|-----|-------------|----------|---------|
| `realtime` | Preview / Production | Fly.io | Push to `dev` / `main` |
| `workers` | Preview / Production | Cloudflare Workers | Push to `dev` / `main` |
| `web` | Production | Vercel | Push/PR (Standard Next.js) |

### Manual Deploy Commands
```bash
# Realtime (Rust)
cd apps/realtime && flyctl deploy --remote-only -c ./fly.production.toml

# Workers API
cd apps/workers && wrangler deploy
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode via Turborepo |
| `pnpm build` | Build all apps for production |
| `pnpm db:migrate` | Generate & apply Drizzle ORM migrations |
| `pnpm db:push` | Push schema changes directly to the database |
| `pnpm db:studio` | Open Drizzle Studio UI |
| `pnpm lint` | Run Biome for linting & formatting |

## 📄 License

This project is licensed under the **ISC License**.  
Authored by **Ali Bassiouni**.
