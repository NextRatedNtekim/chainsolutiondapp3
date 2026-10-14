import { site } from "@/config/site";
import { WALLETS } from "@/lib/wallets";

export type Result<T> = { ok: true; value: T } | { ok: false; error: string };

const CLASS_IDS: string[] = WALLETS.map((w) => w.id);

export function validateComplaint(input: unknown): Result<{ body: string; classId: string }> {
  const { body: rawBody, classId } = (input ?? {}) as { body?: unknown; classId?: unknown };

  const body = typeof rawBody === "string" ? rawBody.trim() : "";
  if (!body) return { ok: false, error: "Enter your complaint before sending." };
  if (body.length > 5000) return { ok: false, error: "Complaints can be up to 5000 characters." };

  if (typeof classId !== "string" || !CLASS_IDS.includes(classId))
    return { ok: false, error: "Choose a valid class and try again." };

  return { ok: true, value: { body, classId } };
}

export function validateSubjects(input: unknown): Result<{ classId: string; subjects: string[] }> {
  const { classId, subjects } = (input ?? {}) as { classId?: unknown; subjects?: unknown };

  if (typeof classId !== "string" || !CLASS_IDS.includes(classId))
    return { ok: false, error: "Choose a valid class and try again." };

  const counts: readonly number[] = site.subjectCounts;
  if (!Array.isArray(subjects) || !counts.includes(subjects.length))
    return { ok: false, error: "Choose how many subjects you offer." };
  const clean = subjects.map((s) => (typeof s === "string" ? s.trim() : ""));
  if (clean.some((s) => !s || s.length > 100)) return { ok: false, error: "Fill in every subject (up to 100 characters each)." };

  return { ok: true, value: { classId, subjects: clean } };
}