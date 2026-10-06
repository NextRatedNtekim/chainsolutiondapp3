"use client";
import Link from "next/link";
import { useState } from "react";
import { VerifyModal } from "@/components/VerifyModal";
import { Steps } from "@/components/Steps";
import { Send } from "lucide-react";

export function ComplaintForm() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = String(new FormData(e.currentTarget).get("body") ?? "");
    setState("loading"); setError("");
    try {
      const res = await fetch("/api/complaints", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ body }) });
      if (!res.ok) { setError((await res.json()).error ?? "Something went wrong. Try again."); setState("idle"); return; }
      setState("done");
    } catch { setError("Can't reach the server. Check your connection and try again."); setState("idle"); }
  }

  if (state === "done")
    return (
      <>
        <Steps current={2} />
        <div className="glass stack">
          <h2>Complaint received</h2>
          {/* <p>Next, a quick class check so we can route it to the right person.</p> */}
          {/* <VerifyModal /> */}
        </div>
      </>
    );
  return (
    <>
      <Steps current={1} />
      <form onSubmit={submit} className="glass stack">
        <label htmlFor="body">Your complaint</label>
        <textarea id="body" name="body" rows={6} maxLength={5000} required />
        <p><Link href="/privacy">Privacy policy</Link></p>
        {error && <p role="alert" style={{ color: "var(--accent)" }}>{error}</p>}
        <button className="btn" disabled={state === "loading"}><Send size={16} /> {state === "loading" ? "Sending…" : "Send complaint"}</button>
      </form>
    </>
  );
}
