import { describe, expect, it } from "vitest";
import { validateComplaint, validateSubjects } from "@/lib/validate";

const twelve = Array.from({ length: 12 }, (_, i) => `Subject ${i + 1}`);

describe("validateComplaint", () => {
  it("rejects empty and whitespace-only input", () => {
    expect(validateComplaint({ body: "" }).ok).toBe(false);
    expect(validateComplaint({ body: "   " }).ok).toBe(false);
    expect(validateComplaint(null).ok).toBe(false);
  });
  it("rejects input over 5000 characters", () => {
    expect(validateComplaint({ body: "a".repeat(5001) }).ok).toBe(false);
  });
  it("accepts and trims valid input", () => {
    expect(validateComplaint({ body: "  hello  " })).toEqual({ ok: true, value: "hello" });
  });
});

describe("validateSubjects", () => {
  it("rejects an unknown class", () => {
    expect(validateSubjects({ classId: "nope", subjects: twelve }).ok).toBe(false);
  });
  it("rejects an unsupported subject count", () => {
    expect(validateSubjects({ classId: "class-1", subjects: twelve.slice(0, 11) }).ok).toBe(false);
  });
  it("rejects empty or overlong subjects", () => {
    expect(validateSubjects({ classId: "class-1", subjects: [...twelve.slice(1), " "] }).ok).toBe(false);
    expect(validateSubjects({ classId: "class-1", subjects: [...twelve.slice(1), "a".repeat(101)] }).ok).toBe(false);
  });
  it("accepts every allowed count and trims entries", () => {
    for (const n of [12, 15, 18, 21, 24]) {
      const r = validateSubjects({ classId: "class-1", subjects: Array.from({ length: n }, () => " Maths ") });
      expect(r.ok).toBe(true);
      if (r.ok) expect(r.value.subjects[0]).toBe("Maths");
    }
  });
});
