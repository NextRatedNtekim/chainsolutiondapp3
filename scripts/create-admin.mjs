// Usage: ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='long password' npm run create-admin
import { neon } from "@neondatabase/serverless";
import { randomBytes, scryptSync } from "node:crypto";

const { DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
if (!DATABASE_URL || !ADMIN_EMAIL || !ADMIN_PASSWORD) { console.error("Set DATABASE_URL, ADMIN_EMAIL and ADMIN_PASSWORD."); process.exit(1); }
if (ADMIN_PASSWORD.length < 12) { console.error("Use a password of at least 12 characters."); process.exit(1); }

const salt = randomBytes(16);
const hash = `scrypt$${salt.toString("hex")}$${scryptSync(ADMIN_PASSWORD, salt, 64).toString("hex")}`;
await neon(DATABASE_URL)`INSERT INTO admins (email, password_hash) VALUES (${ADMIN_EMAIL.trim().toLowerCase()}, ${hash})`;
console.log(`Admin created: ${ADMIN_EMAIL}`);
