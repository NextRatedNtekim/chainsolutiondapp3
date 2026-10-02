import { describe, expect, it, vi } from "vitest";

vi.mock("next/headers", () => ({ cookies: vi.fn() }));
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));

import { hashPassword, verifyPassword } from "@/lib/password";
import { createToken, readToken } from "@/lib/session";

describe("passwords", () => {
  it("verifies the right password only", () => {
    const h = hashPassword("correct horse battery");
    expect(verifyPassword("correct horse battery", h)).toBe(true);
    expect(verifyPassword("wrong", h)).toBe(false);
  });
  it("rejects malformed stored hashes", () => {
    expect(verifyPassword("x", "garbage")).toBe(false);
  });
});

describe("session tokens", () => {
  it("round-trips an admin id", () => {
    expect(readToken(createToken("admin-1"))).toBe("admin-1");
  });
  it("rejects tampered tokens", () => {
    const [payload, sig] = createToken("admin-1").split(".");
    const forged = Buffer.from(JSON.stringify({ sub: "admin-2", exp: 9999999999 })).toString("base64url");
    expect(readToken(`${forged}.${sig}`)).toBeNull();
    expect(readToken(`${payload}.bad`)).toBeNull();
    expect(readToken("nonsense")).toBeNull();
  });
});
