"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";

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
      <button className="btn" onClick={open}>Verify</button>
      <dialog ref={dialog} aria-label="Choose how to verify" onClose={() => setView("choose")}>
        <div className="glass stack">
          {view === "choose" && (
            <>
              <h2>Verify your identity</h2>
              <Link href="/subjects" className="btn">Verify Manually</Link>
              <button className="btn ghost" onClick={() => setView("loading")}>Verify from App</button>
              <p><Link href="/privacy">Privacy policy</Link></p>
            </>
          )}
          {view === "loading" && (
            <div role="status" aria-live="polite" style={{ textAlign: "center" }}>
              <div className="spinner" />
              <p style={{ margin: "0 auto" }}>Connecting to the app…</p>
            </div>
          )}
          {view === "unavailable" && (
            <>
              <h2>{site.appVerify.unavailable}</h2>
              <Link href="/subjects" className="btn">Connect Manually</Link>
            </>
          )}
          <button className="btn ghost" onClick={close}>Close</button>
        </div>
      </dialog>
    </>
  );
}
