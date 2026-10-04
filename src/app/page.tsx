import Link from "next/link";
import { site } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import {
  ArrowRight, Check, Code2, Headphones, Layers, Lock, MessagesSquare, ShieldCheck,
  Network, Wallet, SearchCheck, Blocks,
} from "lucide-react";

const pillarIcons = [Blocks, ShieldCheck, Layers];
const serviceIcons = [Code2, MessagesSquare, SearchCheck, Wallet];

export default function Landing() {
  return (
    <main>
      {/* HERO / WELCOME */}
      <section className="hero" id="top">
        <div className="wrap hero-inner">
          <h1>Welcome to {site.name}</h1>
          <p className="lead">{site.description}</p>
          <div className="actions center">
            <Link href="/verify" className="btn lg">Get Started <ArrowRight size={18} aria-hidden /></Link>
            <Link href="/#pillars" className="btn ghost lg">Learn more</Link>
          </div>
          <p className="hero-note"><Lock size={14} aria-hidden /> {site.heroNote}</p>
        </div>

        <div className="wrap">
          <div className="art art-sunset showcase">
            <div className="mock" aria-hidden>
              <div className="mock-bar">
                <span className="dots"><i /><i /><i /></span>
                <span className="mock-title">{site.name}</span>
                <span className="pill">Secure</span>
              </div>
              <div className="mock-body">
                <div className="mock-steps">
                  <span className="on">1 Connect</span><span>2 Choose chain</span>
                </div>
                <div className="mock-field">
                  <small>Your wallet</small>
                  <p>Connect a wallet to start. Your keys and assets stay with you…</p>
                </div>
                <div className="mock-row">
                  <span className="chip"><Check size={12} /> End-to-end encrypted</span>
                  <span className="chip hot">Multichain ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-label="Chains and services">
        <div className="marquee-track" aria-hidden>
          {[0, 1].map((k) => (
            <ul key={k}>
              {site.topics.map((t) => <li key={`${k}-${t}`}>{t}</li>)}
            </ul>
          ))}
        </div>
        <p className="sr-only">{site.topics.join(", ")}</p>
      </div>

      {/* WELCOME STATEMENT */}
      <section className="wrap frame" id="welcome">
        <Reveal>
          <p className="eyebrow">{site.welcome.eyebrow}</p>
          <h2 className="center-h">{site.welcome.title}</h2>
          <p className="center-p">{site.welcome.body}</p>
          <div className="actions center">
            <Link href="/verify" className="btn lg">Get Started <ArrowRight size={18} aria-hidden /></Link>
          </div>
        </Reveal>
      </section>

      {/* PILLARS: DECENTRALIZED / SAFETY & SECURITY / MULTICHAIN */}
      <section className="wrap frame" id="pillars">
        <Reveal>
          <p className="eyebrow">{site.pillars.eyebrow}</p>
          <h2 className="center-h">{site.pillars.title}</h2>
        </Reveal>
        <div className="grid cols-3">
          {site.pillars.items.map((p, i) => {
            const Icon = pillarIcons[i % pillarIcons.length];
            return (
              <Reveal key={p.title} delay={i * 100}>
                <div className="cell">
                  <span className="icon-badge"><Icon size={20} /></span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  <div className="actions">
                    <Link href="/explore" className="btn ghost">Learn more</Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* SERVICES */}
      <section className="wrap frame" id="services">
        <Reveal>
          <p className="eyebrow">{site.services.eyebrow}</p>
          <h2 className="center-h">{site.services.title}</h2>
          <p className="center-p">{site.services.intro}</p>
        </Reveal>
        <div className="grid cols-2">
          {site.services.items.map((s, i) => {
            const Icon = serviceIcons[i % serviceIcons.length];
            return (
              <Reveal key={s.title} delay={i * 100}>
                <div className="cell">
                  <span className="icon-badge"><Icon size={20} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <div className="actions">
                    <Link href="/explore" className="btn ghost">Learn more</Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section id="support" className="wrap cta-wrap">
        <Reveal>
          <div className="art art-sunset cta">
            <div className="cta-inner">
              <span className="icon-badge"><Network size={22} /></span>
              <h2>Start with {site.name}</h2>
              <p>{site.support}</p>
              <Link href="/verify" className="btn lg">Get Started <ArrowRight size={18} aria-hidden /></Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
