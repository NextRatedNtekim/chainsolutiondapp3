import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { limited } from "@/lib/rateLimit";
import { validateSubjects } from "@/lib/validate";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (limited(`subjects:${ip}`)) return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  const parsed = validateSubjects(await req.json().catch(() => null));
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const { classId, subjects } = parsed.value;
  try {
    await getSql()`INSERT INTO subject_submissions (class_id, subject_count, subjects) VALUES (${classId}, ${subjects.length}, ${subjects})`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST /api/subjects failed:", err);
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}