"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { ClipboardList, ShieldCheck, Smartphone } from "lucide-react";

type View = "choose" | "loading" | "unavailable";

export function VerifyModal() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [view, setView] = useState<View>("choose");

  useEffect(() => {
    if (view !== "loading") return;
    const t = setTimeout(() => setView("unavailable"), site.appVerify.loadingSeconds * 1000);
    return () => clearTimeout(t);
  }, [view]);

  const open = () => { setView("choose"); dialog.current?.showModal(); };
  const close = () => dialog.current?.close();

  return (
    <>
      <button className="btn" onClick={open}>
        <ShieldCheck size={18} /> Continue
      </button>
      <dialog ref={dialog} aria-label="Confirm your class details" onClose={() => setView("choose")}>
        <div className="glass stack">
          {view === "choose" && (
            <>
              <h2>Confirm your class details</h2>
              <p>Just your class and the subjects you offer, so we can route your complaint to the right staff member. Nothing sensitive, no account needed.</p>
              <Link href="/subjects" className="btn"><ClipboardList size={18} /> Enter manually</Link>
              <button className="btn ghost" onClick={() => setView("loading")}><Smartphone size={18} /> Verify from school app</button>
              <p><Link href="/privacy">Privacy policy</Link></p>
            </>
          )}
          {view === "loading" && (
            <div role="status" aria-live="polite" style={{ textAlign: "center" }}>
              <div className="spinner" />
              <p style={{ margin: "0 auto" }}>Connecting to the school app…</p>
            </div>
          )}
          {view === "unavailable" && (
            <>
              <h2>{site.appVerify.unavailable}</h2>
              <p>No problem — enter your class and subjects yourself instead.</p>
              <Link href="/subjects" className="btn"><ClipboardList size={18} /> Enter manually</Link>
            </>
          )}
          <button className="btn ghost" onClick={close}>Close</button>
        </div>
      </dialog>
    </>
  );
}
