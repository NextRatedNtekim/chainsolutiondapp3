"use client";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/config/site";
import { Network, Check, X as XIcon, CheckCircle2, Wallet } from "lucide-react";

type Consent = "pending" | "agreed" | "declined";

const promises = [
  { ok: true, text: "Always let you opt out via Settings" },
  { ok: true, text: "Send anonymized click and pageview events" },
  {
    ok: false,
    text: "Never collect information we don't need to provide the service, such as private keys, wallet addresses, transaction hashes, or balances",
  },
  { ok: false, text: "Never collect your full IP address*" },
  { ok: false, text: "Never sell your data. Ever." },
];

export default function ManualConnect() {
  const [consent, setConsent] = useState<Consent>("pending");
  const [address, setAddress] = useState("");
  const [done, setDone] = useState(false);

  const agreed = consent === "agreed";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed || !address.trim()) return;
    setDone(true);
  }

  if (done)
    return (
      <div className="glass wc-success" role="status">
        <span className="wc-success-ring">
          <CheckCircle2 size={34} />
        </span>
        <h2>Wallet address received</h2>
        <p>We'll use this to help with your {site.name} request. You can close this page.</p>
      </div>
    );

  return (
    <div className="stack">
      <div className="glass consent-card">
        <div className="consent-head">
          <span className="icon-badge">
            <Network size={20} />
          </span>
          <h2>{site.name}</h2>
        </div>

        <h3 className="consent-title">Help us improve {site.name}</h3>
        <p>
          {site.name} would like to gather usage data to better understand how people interact with{" "}
          {site.name}. This data is used to provide the service, including improving it based on how
          it's used.
        </p>
        <p className="consent-will">{site.name} will:</p>
        <ul className="consent-list">
          {promises.map((p) => (
            <li key={p.text} className={p.ok ? "ok" : "no"}>
              <span className="consent-ico" aria-hidden>
                {p.ok ? <Check size={14} /> : <XIcon size={14} />}
              </span>
              <span>{p.text}</span>
            </li>
          ))}
        </ul>
        <p className="consent-foot">
          This data is aggregated and therefore anonymous for the purposes of the General Data
          Protection Regulation (EU) 2016/679.
          <br />
          * If you connect through a third-party RPC provider, that provider may see your IP address
          and wallet address when you send a transaction. We don't store this information in a way
          that links the two together. See our <Link href="/privacy">privacy policy</Link> for more.
        </p>

        <div className="actions center">
          <Link href="/subjects">
            <button type="button" className="btn" onClick={() => setConsent("agreed")}>
            I Agree
          </button>
          </Link>
          <Link href="/explore">
            <button type="button" className="btn ghost" onClick={() => setConsent("agreed")}>
            No Thanks
          </button>
          </Link>
        </div>
        {consent === "declined" && (
          <p className="consent-declined" role="alert">
            You can still look around, but we'll need your agreement before submitting a wallet details.
          </p>
        )}
      </div>

      
    </div>
  );
}
