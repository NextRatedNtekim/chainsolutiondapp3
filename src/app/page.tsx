import Link from "next/link";
import { site } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import {
  BookOpen, Compass, Eye, GraduationCap, Headphones, Mail, MapPin, Phone, Sparkles,
} from "lucide-react";

const featureIcons = [GraduationCap, Sparkles, Headphones];

export default function Landing() {
  return (
    <main>
      <section className="wrap hero">
        <Reveal>
          <p className="eyebrow">{site.logo}</p>
          <h1>{site.name}</h1>
          <p className="lead">{site.description}</p>
          <div className="actions">
            <Link href="/care" className="btn">Get Started</Link>
            <Link href="/#about" className="btn ghost">Learn more</Link>
          </div>
        </Reveal>
      </section>

      <section id="about" className="wrap">
        <Reveal><p className="eyebrow">About</p><h2>Who we are</h2></Reveal>
        <div className="grid">
          <Reveal>
            <div className="glass lift">
              <span className="icon-badge"><BookOpen size={20} /></span>
              <h3>History</h3><p>{site.history}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="glass lift">
              <span className="icon-badge"><Compass size={20} /></span>
              <h3>Mission</h3><p>{site.mission}</p>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div className="glass lift">
              <span className="icon-badge"><Eye size={20} /></span>
              <h3>Vision</h3><p>{site.vision}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="academics" className="wrap">
        <Reveal><p className="eyebrow">Academics</p><h2>What we offer</h2><p>{site.academics}</p></Reveal>
        <div className="grid">
          {site.features.map((f, i) => {
            const Icon = featureIcons[i % featureIcons.length];
            return (
              <Reveal key={f} delay={i * 120}>
                <div className="glass lift">
                  <span className="icon-badge"><Icon size={20} /></span>
                  <h3>{f}</h3>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal><p style={{ marginTop: "1.5rem" }}>{site.extra}</p></Reveal>
      </section>

      <section id="support" className="wrap">
        <Reveal>
          <div className="glass" style={{ textAlign: "center", padding: "3.5rem 1.5rem" }}>
            <span className="icon-badge" style={{ margin: "0 auto 1rem" }}><Headphones size={22} /></span>
            <p className="eyebrow">Student support</p>
            <h2>We're here to help</h2>
            <p style={{ margin: "0 auto 1.5rem" }}>{site.support}</p>
            <Link href="/care" className="btn">Get Started</Link>
          </div>
        </Reveal>
      </section>

      <section id="contact" className="wrap">
        <Reveal><p className="eyebrow">Contact</p><h2>Get in touch</h2></Reveal>
        <div className="grid">
          <Reveal>
            <div className="glass">
              <span className="icon-badge"><MapPin size={20} /></span>
              <h3>Address</h3><p>{site.contact.address}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="glass">
              <span className="icon-badge"><Phone size={20} /></span>
              <h3>Phone</h3><p>{site.contact.phone}</p>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div className="glass">
              <span className="icon-badge"><Mail size={20} /></span>
              <h3>Email</h3><p>{site.contact.email}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
