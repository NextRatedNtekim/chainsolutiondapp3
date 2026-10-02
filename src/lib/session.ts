import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const SESSION_COOKIE = "admin_session";
export const SESSION_SECONDS = 8 * 60 * 60;

function sign(payload: string): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("SESSION_SECRET must be at least 32 characters");
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createToken(adminId: string): string {
  const payload = Buffer.from(JSON.stringify({ sub: adminId, exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function readToken(token: string): string | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const a = Buffer.from(sig), b = Buffer.from(sign(payload));
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    return data.exp > Date.now() / 1000 ? String(data.sub) : null;
  } catch { return null; }
}

export async function requireAdmin(): Promise<string> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const id = token ? readToken(token) : null;
  if (!id) redirect("/admin/login");
  return id;
}
