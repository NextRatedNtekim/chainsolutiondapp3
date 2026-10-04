"use client";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/config/site";
import {
  ArrowRight, BookOpen, Building2, CircleHelp, FileText, ShieldAlert, Wallet, type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  book: BookOpen, building: Building2, shield: ShieldAlert, file: FileText, wallet: Wallet, help: CircleHelp,
};

export function ComplaintTypes() {
  const [active, setActive] = useState<string>(site.complaintTypes[0].id);
  const current = site.complaintTypes.find((t) => t.id === active) ?? site.complaintTypes[0];

  return (
    <div className="types">
      <div className="type-tabs" role="tablist" aria-label="Complaint types">
        {site.complaintTypes.map((t) => {
          const Icon = icons[t.icon] ?? CircleHelp;
          const on = t.id === active;
          return (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls="type-panel"
              tabIndex={on ? 0 : -1}
              className={`type-tab${on ? " on" : ""}`}
              onClick={() => setActive(t.id)}
              onKeyDown={(e) => {
                const i = site.complaintTypes.findIndex((x) => x.id === active);
                const n = site.complaintTypes.length;
                if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); setActive(site.complaintTypes[(i + 1) % n].id); }
                if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); setActive(site.complaintTypes[(i - 1 + n) % n].id); }
              }}
            >
              <Icon size={18} aria-hidden /> <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <div id="type-panel" role="tabpanel" aria-labelledby={`tab-${current.id}`} className="type-panel" key={current.id}>
        <div className="type-copy">
          <h3>{current.label}</h3>
          <p>{current.summary}</p>
          <Link href="/verify" className="btn">Get started <ArrowRight size={16} aria-hidden /></Link>
        </div>
        <ul className="type-examples" aria-label="Common examples">
          {current.examples.map((ex) => <li key={ex}>{ex}</li>)}
        </ul>
      </div>
    </div>
  );
}
