import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/db", () => ({ getSql: () => sqlMock }));

import { POST as postComplaint } from "@/app/api/complaints/route";
import { POST as postSubjects } from "@/app/api/subjects/route";
import { POST as postLogin } from "@/app/api/admin/login/route";
import { hashPassword } from "@/lib/password";

let n = 0;
const req = (path: string, body: unknown, ip = `10.0.0.${++n}`) =>
  new Request(`http://localhost${path}`, { method: "POST", headers: { "x-forwarded-for": ip }, body: JSON.stringify(body) });
const twelve = Array.from({ length: 12 }, (_, i) => `S${i}`);

beforeEach(() => { sqlMock.mockReset(); sqlMock.mockResolvedValue([]); });

describe("POST /api/complaints", () => {
  it("rejects invalid input without touching the database", async () => {
    expect((await postComplaint(req("/api/complaints", { body: "" }))).status).toBe(400);
    expect(sqlMock).not.toHaveBeenCalled();
  });
  it("stores a valid complaint", async () => {
    expect((await postComplaint(req("/api/complaints", { body: "Problem" }))).status).toBe(200);
    expect(sqlMock).toHaveBeenCalledTimes(1);
  });
  it("hides database errors", async () => {
    sqlMock.mockRejectedValue(new Error("password authentication failed for user x"));
    const res = await postComplaint(req("/api/complaints", { body: "Problem" }));
    expect(res.status).toBe(500);
    expect(JSON.stringify(await res.json())).not.toContain("password authentication");
  });
  it("rate limits repeated requests from one IP", async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 7; i++) statuses.push((await postComplaint(req("/api/complaints", { body: "x" }, "9.9.9.9"))).status);
    expect(statuses.slice(0, 5).every((s) => s === 200)).toBe(true);
    expect(statuses[6]).toBe(429);
  });
});

describe("POST /api/subjects", () => {
  it("rejects a wrong subject count", async () => {
    expect((await postSubjects(req("/api/subjects", { classId: "class-1", subjects: twelve.slice(1) }))).status).toBe(400);
  });
  it("stores a valid submission", async () => {
    expect((await postSubjects(req("/api/subjects", { classId: "class-1", subjects: twelve }))).status).toBe(200);
    expect(sqlMock).toHaveBeenCalledTimes(1);
  });
  it("returns a generic error when the database fails", async () => {
    sqlMock.mockRejectedValue(new Error("connection refused"));
    const res = await postSubjects(req("/api/subjects", { classId: "class-1", subjects: twelve }));
    expect(res.status).toBe(500);
  });
});

describe("POST /api/admin/login", () => {
  it("rejects unknown emails with the generic message", async () => {
    const res = await postLogin(req("/api/admin/login", { email: "a@b.co", password: "whatever-password" }));
    expect(res.status).toBe(401);
    expect((await res.json()).error).toBe("Incorrect email or password.");
  });
  it("rejects a wrong password", async () => {
    sqlMock.mockResolvedValue([{ id: "1", password_hash: hashPassword("right-password-123") }]);
    expect((await postLogin(req("/api/admin/login", { email: "a@b.co", password: "wrong" }))).status).toBe(401);
  });
  it("signs in with the right password and sets a session cookie", async () => {
    sqlMock.mockResolvedValue([{ id: "1", password_hash: hashPassword("right-password-123") }]);
    const res = await postLogin(req("/api/admin/login", { email: "a@b.co", password: "right-password-123" }));
    expect(res.status).toBe(200);
    expect(res.headers.get("set-cookie")).toContain("admin_session=");
    expect(res.headers.get("set-cookie")?.toLowerCase()).toContain("httponly");
  });
});
