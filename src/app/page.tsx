import Link from "next/link";
import { site } from "@/config/site";
import { Reveal } from "@/components/Reveal";

export default function Landing() {
  return (
    <main>
      <section className="wrap hero">
        <Reveal>
          <p className="eyebrow">{site.logo}</p>
          <h1>{site.name}</h1>
          <p className="lead">{site.description}</p>
          <div className="actions">
            <Link href="/subject" className="btn">Get Started</Link>
            <Link href="/#about" className="btn ghost">Learn more</Link>
          </div>
        </Reveal>
      </section>

      <section id="about" className="wrap">
        <Reveal><p className="eyebrow">About</p><h2>Who we are</h2></Reveal>
        <div className="grid">
          {[["History", site.history], ["Mission", site.mission], ["Vision", site.vision]].map(([t, b], i) => (
            <Reveal key={t} delay={i * 120}><div className="glass lift"><h3>{t}</h3><p>{b}</p></div></Reveal>
          ))}
        </div>
      </section>

      <section id="academics" className="wrap">
        <Reveal><p className="eyebrow">Academics</p><h2>What we offer</h2><p>{site.academics}</p></Reveal>
        <div className="grid">
          {site.features.map((f, i) => (
            <Reveal key={f} delay={i * 120}><div className="glass lift"><span className="num">0{i + 1}</span><h3>{f}</h3></div></Reveal>
          ))}
        </div>
        <Reveal><p style={{ marginTop: "1.5rem" }}>{site.extra}</p></Reveal>
      </section>

      <section id="support" className="wrap">
        <Reveal>
          <div className="glass" style={{ textAlign: "center", padding: "3.5rem 1.5rem" }}>
            <p className="eyebrow">Student support</p>
            <h2>We’re here to help</h2>
            <p style={{ margin: "0 auto 1.5rem" }}>{site.support}</p>
            <Link href="/care" className="btn">Get Started</Link>
          </div>
        </Reveal>
      </section>

      <section id="contact" className="wrap">
        <Reveal><p className="eyebrow">Contact</p><h2>Get in touch</h2></Reveal>
        <div className="grid">
          {[["Address", site.contact.address], ["Phone", site.contact.phone], ["Email", site.contact.email]].map(([t, b], i) => (
            <Reveal key={t} delay={i * 120}><div className="glass"><h3>{t}</h3><p>{b}</p></div></Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
