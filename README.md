# School support platform
Run: `npm install && npm run dev`. Edit school content only in `src/config/site.ts`.
Built so far: setup, design tokens (light/dark), landing page, customer-care page, Verify modal, Verify from App unavailable state.
Setup: create a Neon database, run db/schema.sql, copy .env.example to .env.local and set DATABASE_URL.
Built: complaint step, class/subjects step, API routes with server validation and rate limiting.
Admin: set SESSION_SECRET in .env.local (32+ random characters, e.g. `openssl rand -base64 48`), then run `ADMIN_EMAIL=you@example.com ADMIN_PASSWORD="a long password" npm run create-admin` once per admin (needs Node 20.6+). Sign in at /admin/login.
Privacy policy: edit the placeholders in src/config/site.ts (privacy section); page is /privacy.
Tests: `npm test` (validation, passwords, sessions, API routes with a mocked database, and component tests for landing, Verify modal, complaint, subjects, privacy).
Next: bot check, shared rate limiter, security review.
