"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogIn } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: f.get("email"), password: f.get("password") }) });
      if (!res.ok) { setError((await res.json()).error ?? "Something went wrong. Try again."); setLoading(false); return; }
      router.push("/admin");
    } catch { setError("Can't reach the server. Check your connection and try again."); setLoading(false); }
  }

  return (
    <form onSubmit={submit} className="glass stack" style={{ maxWidth: "26rem" }}>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" autoComplete="username" required />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" autoComplete="current-password" required />
      {error && <p role="alert" style={{ color: "var(--accent)" }}>{error}</p>}
      <button className="btn" disabled={loading}><LogIn size={16} /> {loading ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
