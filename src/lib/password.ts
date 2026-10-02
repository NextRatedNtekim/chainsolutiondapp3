import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

// Format: scrypt$<salt hex>$<hash hex>. scrypt ships with Node, so no extra dependency is needed.
export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  return `scrypt$${salt.toString("hex")}$${scryptSync(password, salt, 64).toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [, salt, hash] = stored.split("$");
  if (!salt || !hash) return false;
  const actual = scryptSync(password, Buffer.from(salt, "hex"), 64);
  return timingSafeEqual(Buffer.from(hash, "hex"), actual);
}
