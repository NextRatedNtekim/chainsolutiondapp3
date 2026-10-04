"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Headphones, MessageCircle, Send, X } from "lucide-react";

type Msg = { id: number; from: "me" | "system"; text: string; error?: boolean };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GREETING = "Tell us what's going on. We'll route it to the right staff member.";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const nextId = useRef(1);

  useEffect(() => { if (open) input.current?.focus(); }, [open]);
  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight }); }, [msgs, open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const push = (m: Omit<Msg, "id">) => setMsgs((v) => [...v, { ...m, id: nextId.current++ }]);

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    const text = draft.trim();
    if (!text || sending) return;
    const mail = email.trim();
    if (!sent && mail && !EMAIL_RE.test(mail)) { setEmailError("Enter a valid email or leave it blank."); return; }
    setEmailError(""); setSending(true);
    const body = !sent && mail ? `${text}\n\nReply email: ${mail}` : text;
    try {
      const res = await fetch("/api/complaints", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ body }) });
      if (!res.ok) { push({ from: "system", error: true, text: (await res.json().catch(() => ({}))).error ?? "Something went wrong. Try again." }); setSending(false); return; }
      push({ from: "me", text }); setDraft(""); setSent(true);
      push({ from: "system", text: "Received. Add anything else here, or finish the class check so we can route it." });
    } catch {
      push({ from: "system", error: true, text: "Can't reach the server. Check your connection and try again." });
    }
    setSending(false);
  }

  return (
    <div className="chat">
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Chat with the support desk">
          <header className="chat-head">
            <button type="button" className="chat-icon" onClick={() => setOpen(false)} aria-label="Close chat"><ChevronLeft size={20} /></button>
            <span className="chat-avatar" aria-hidden><Headphones size={18} /></span>
            <div className="chat-title"><strong>Hi there <span aria-hidden>👋</span></strong><small>Anonymous · replies within 48 hours</small></div>
          </header>

          <div className="chat-log" ref={log} role="log" aria-live="polite">
            <div className="chat-bubble sys">{GREETING}</div>
            <div className="chat-card">
              <label htmlFor="chat-email">Email <span className="chat-opt">(optional, only if you want a reply)</span></label>
              <input id="chat-email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com"
                value={email} readOnly={sent} onChange={(e) => { setEmail(e.target.value); setEmailError(""); }} />
              {emailError && <p role="alert" className="chat-err">{emailError}</p>}
            </div>
            {msgs.map((m) => (
              <div key={m.id} className={`chat-bubble ${m.from === "me" ? "me" : "sys"}${m.error ? " err" : ""}`} role={m.error ? "alert" : undefined}>{m.text}</div>
            ))}
          </div>

          <form className="chat-compose" onSubmit={send}>
            <textarea ref={input} rows={2} maxLength={4900} placeholder="Enter your message…" aria-label="Your message" value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} />
            <button className="chat-send" disabled={sending || !draft.trim()} aria-label={sending ? "Sending" : "Send message"}><Send size={18} /></button>
          </form>
        </div>
      )}

      <div className="chat-launch">
        {!open && <button type="button" className="chat-teaser" onClick={() => setOpen(true)}>Chat with us <span aria-hidden>👋</span></button>}
        <button type="button" className="chat-fab" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={open ? "Close chat" : "Open chat"}>
          {open ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>
    </div>
  );
}
