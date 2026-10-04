import { site } from "@/config/site";

export type Result<T> = { ok: true; value: T } | { ok: false; error: string };

export function validateComplaint(input: unknown): Result<string> {
  const body = typeof (input as { body?: unknown })?.body === "string" ? (input as { body: string }).body.trim() : "";
  if (!body) return { ok: false, error: "Enter your complaint before sending." };
  if (body.length > 5000) return { ok: false, error: "Complaints can be up to 5000 characters." };
  return { ok: true, value: body };
}

export function validateSubjects(input: unknown): Result<{ classId: string; subjects: string[] }> {
  const { classId, subjects } = (input ?? {}) as { classId?: unknown; subjects?: unknown };
  if (typeof classId !== "string" || !site.classes.some((c) => c.id === classId))
    return { ok: false, error: "input correct details" };
  const counts: readonly number[] = site.subjectCounts;
  if (!Array.isArray(subjects) || !counts.includes(subjects.length))
    return { ok: false, error: "Choose how many subjects you offer." };
  const clean = subjects.map((s) => (typeof s === "string" ? s.trim() : ""));
  if (clean.some((s) => !s || s.length > 100)) return { ok: false, error: "Fill in every subject (up to 100 characters each)." };
  return { ok: true, value: { classId, subjects: clean } };
}
