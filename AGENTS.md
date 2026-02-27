# AGENTS.md

## Cursor Cloud specific instructions

This is a single-service cyberpunk portfolio app (React 18 + Express + Vite + TypeScript). No external databases or services are needed — all data is in-memory.

### Running the app

- **Dev server**: `npm run dev` — starts Express on port 5000 with Vite HMR for the React frontend
- **Build**: `npm run build` — Vite build + static API JSON generation + esbuild server bundle
- **Type check**: `npm run check` (pre-existing TS errors exist in `ContactSection.tsx` and `ParticleBackground.tsx`; these do not block dev or build)

### Key notes

- No environment variables are required for development. `DATABASE_URL` is only needed for the unused `db:push` script.
- The project uses npm (lockfile: `package-lock.json`).
- No linter is configured in `package.json` scripts; `npm run check` (tsc) is the closest available check.
- The Express server serves both the API (`/api/*`) and the Vite-powered React frontend from a single process on port 5000.
