import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";
import { limited } from "@/lib/rateLimit";
import { createToken, SESSION_COOKIE, SESSION_SECONDS } from "@/lib/session";

const DUMMY_HASH = hashPassword("not-a-real-password"); // keeps timing similar when the email is unknown

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (limited(`login:${ip}`)) return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  const { email, password } = (await req.json().catch(() => ({}))) as { email?: unknown; password?: unknown };
  if (typeof email !== "string" || typeof password !== "string" || !email || !password || password.length > 200)
    return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
  try {
    const rows = (await getSql()`SELECT id, password_hash FROM admins WHERE email = ${email.trim().toLowerCase()}`) as { id: string; password_hash: string }[];
    const admin = rows[0];
    const valid = verifyPassword(password, admin?.password_hash ?? DUMMY_HASH);
    if (!admin || !valid) return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, createToken(admin.id), {
      httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: SESSION_SECONDS,
    });
    return res;
  } catch (err) {
    console.error("POST /api/admin/login failed:", err);
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}
