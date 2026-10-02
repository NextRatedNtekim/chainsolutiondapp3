import Link from "next/link";
import { site } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import { ComplaintTypes } from "@/components/ComplaintTypes";
import { Faq } from "@/components/Faq";
import {
  ArrowRight, BookOpen, Check, Compass, Eye, GraduationCap, Headphones, Lock, Mail, MapPin, Phone,
  Route, Smartphone, Sparkles, UserX, X, MessageSquareText, Clock,
} from "lucide-react";

const featureIcons = [GraduationCap, Sparkles, Headphones];
const benefitIcons = [Smartphone, Lock, Route];
const problemIcons = [Compass, UserX, Clock];

export default function Landing() {
  return (
    <main>
      {/* HERO */}
      <section className="hero" id="top">
        <div className="wrap hero-inner">
          <p className="eyebrow">{site.tagline}</p>
          <h1>Speak up. We&rsquo;ll make sure the right person hears.</h1>
          <p className="lead">{site.description}</p>
          <div className="actions center">
            <Link href="/care" className="btn lg">Get Started <ArrowRight size={18} aria-hidden /></Link>
            <Link href="/#types" className="btn ghost lg">See complaint types</Link>
          </div>
          <p className="hero-note"><Lock size={14} aria-hidden /> {site.heroNote}</p>
        </div>

        <div className="wrap">
          <div className="art art-sunset showcase">
            <div className="mock" aria-hidden>
              <div className="mock-bar">
                <span className="dots"><i /><i /><i /></span>
                <span className="mock-title">{site.name}</span>
                <span className="pill">Anonymous</span>
              </div>
              <div className="mock-body">
                <div className="mock-steps">
                  <span className="on">1 Complaint</span><span>2 Verify</span><span>3 Subjects</span>
                </div>
                <div className="mock-field">
                  <small>Your complaint</small>
                  <p>The water tap near Block B has been leaking for two weeks and the floor is always wet…</p>
                </div>
                <div className="mock-row">
                  <span className="chip"><Check size={12} /> No name needed</span>
                  <span className="chip hot">Routed to Facilities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-label="Topics students raise">
        <div className="marquee-track" aria-hidden>
          {[0, 1].map((k) => (
            <ul key={k}>
              {site.topics.map((t) => <li key={`${k}-${t}`}>{t}</li>)}
            </ul>
          ))}
        </div>
        <p className="sr-only">{site.topics.join(", ")}</p>
      </div>

      {/* PROBLEM */}
      <section className="wrap frame" id="why">
        <Reveal>
          <p className="eyebrow">Why this exists</p>
          <h2 className="center-h">Raising a concern shouldn&rsquo;t feel this hard</h2>
        </Reveal>
        <div className="grid cols-3">
          {site.problems.map((p, i) => {
            const Icon = problemIcons[i % problemIcons.length];
            return (
              <Reveal key={p.title} delay={i * 100}>
                <div className="cell">
                  <span className="icon-badge"><Icon size={20} /></span>
                  <h3>{p.title}</h3><p>{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* COMPLAINT TYPES */}
      <section className="wrap frame" id="types">
        <Reveal>
          <p className="eyebrow">Complaint types</p>
          <h2 className="center-h">What would you like to tell us about?</h2>
          <p className="center-p">Pick a topic to see what it covers, then start your complaint when you&rsquo;re ready.</p>
        </Reveal>
        <ComplaintTypes />
      </section>

      {/* BENTO FEATURES */}
      <section className="wrap frame" id="features">
        <Reveal>
          <p className="eyebrow">How we help</p>
          <h2 className="center-h">One portal. Every concern. Clear next steps.</h2>
        </Reveal>
        <div className="grid cols-3 bento">
          {site.bento.map((b, i) => (
            <Reveal key={b.title} delay={i * 100}>
              <article className="bento-card">
                <div className={`art art-${b.art} bento-art`}>
                  <div className="mock small" aria-hidden>
                    {i === 0 && (<>
                      <div className="mock-line"><MessageSquareText size={14} /> Leaking tap, Block B</div>
                      <div className="mock-line dim">Class check: SS 1</div>
                      <div className="mock-line hot"><Route size={14} /> Sent to Facilities</div>
                    </>)}
                    {i === 1 && (<>
                      <div className="mock-line">Name <span className="pill">not collected</span></div>
                      <div className="mock-line">Student ID <span className="pill">not collected</span></div>
                      <div className="mock-line">Contact <span className="pill">not collected</span></div>
                    </>)}
                    {i === 2 && (<>
                      <div className="mock-line"><Check size={14} /> Complaint received</div>
                      <div className="mock-line"><Clock size={14} /> Under review</div>
                      <div className="mock-line hot"><Headphones size={14} /> Reply within 48 hrs</div>
                    </>)}
                  </div>
                </div>
                <div className="bento-copy"><h3>{b.title}</h3><p>{b.body}</p></div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="wrap frame" id="benefits">
        <Reveal>
          <p className="eyebrow">Benefits</p>
          <h2 className="center-h">Built around how students actually use it</h2>
        </Reveal>
        <div className="grid cols-3">
          {site.benefits.map((b, i) => {
            const Icon = benefitIcons[i % benefitIcons.length];
            return (
              <Reveal key={b.title} delay={i * 100}>
                <div className="cell">
                  <span className="icon-badge"><Icon size={20} /></span>
                  <h3>{b.title}</h3><p>{b.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* COMPARE */}
      <section className="wrap frame" id="compare">
        <Reveal><h2 className="center-h">Suggestion box vs {site.name.split(" ")[0]} portal</h2></Reveal>
        <Reveal>
          <div className="compare" role="table" aria-label="Suggestion box compared with the portal">
            <div className="art art-sky compare-head" role="columnheader">Suggestion box</div>
            <div className="art art-ember compare-head" role="columnheader">{site.name.split(" ")[0]} portal</div>
            {site.compare.before.map((t, i) => (
              <div key={t} className="compare-row" role="row">
                <div className="compare-cell" role="cell"><X size={16} aria-hidden /> {t}</div>
                <div className="compare-cell us" role="cell"><Check size={16} aria-hidden /> {site.compare.after[i]}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* HOW IT WORKS */}
      <section className="wrap frame" id="how">
        <Reveal>
          <p className="eyebrow">How it works</p>
          <h2 className="center-h">Get started in three short steps</h2>
        </Reveal>
        <ol className="how">
          {site.howSteps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 100}>
                <div className="cell">
                  <span className="how-num" aria-hidden>{i + 1}</span>
                  <h3>{s.title}</h3><p>{s.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="actions center"><Link href="/care" className="btn lg">Get Started <ArrowRight size={18} aria-hidden /></Link></div>
      </section>

      {/* ABOUT */}
      <section id="about" className="wrap frame">
        <Reveal><p className="eyebrow">About</p><h2 className="center-h">Who we are</h2></Reveal>
        <div className="grid cols-3">
          <Reveal>
            <div className="cell">
              <span className="icon-badge"><BookOpen size={20} /></span>
              <h3>History</h3><p>{site.history}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="cell">
              <span className="icon-badge"><Compass size={20} /></span>
              <h3>Mission</h3><p>{site.mission}</p>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div className="cell">
              <span className="icon-badge"><Eye size={20} /></span>
              <h3>Vision</h3><p>{site.vision}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ACADEMICS */}
      <section id="academics" className="wrap frame">
        <Reveal>
          <p className="eyebrow">Offers</p>
          <h2 className="center-h">What we offer</h2>
          <p className="center-p">{site.academics}</p>
        </Reveal>
        <div className="grid cols-3">
          {site.features.map((f, i) => {
            const Icon = featureIcons[i % featureIcons.length];
            return (
              <Reveal key={f} delay={i * 120}>
                <div className="cell">
                  <span className="icon-badge"><Icon size={20} /></span>
                  <h3>{f}</h3>
                </div>
              </Reveal>
            );
          })}
        </div>
        {/* <Reveal><p className="center-p note">{site.extra}</p></Reveal> */}
      </section>

      {/* FAQ */}
      <section id="faq" className="wrap frame">
        <Reveal><p className="eyebrow">FAQs</p><h2 className="center-h">Questions students ask</h2></Reveal>
        <Reveal><Faq /></Reveal>
      </section>

      {/* SUPPORT CTA */}
      <section id="support" className="wrap cta-wrap">
        <Reveal>
          <div className="art art-sunset cta">
            <div className="cta-inner">
              <span className="icon-badge"><Headphones size={22} /></span>
              <h2>We&rsquo;re here to help</h2>
              <p>{site.support}</p>
              <Link href="/care" className="btn lg">Get Started <ArrowRight size={18} aria-hidden /></Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      {/* <section id="contact" className="wrap frame">
        <Reveal><p className="eyebrow">Contact</p><h2 className="center-h">Get in touch</h2></Reveal>
        <div className="grid cols-3">
          <Reveal>
            <div className="cell">
              <span className="icon-badge"><MapPin size={20} /></span>
              <h3>Address</h3><p>{site.contact.address}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="cell">
              <span className="icon-badge"><Phone size={20} /></span>
              <h3>Phone</h3><p>{site.contact.phone}</p>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div className="cell">
              <span className="icon-badge"><Mail size={20} /></span>
              <h3>Email</h3><p>{site.contact.email}</p>
            </div>
          </Reveal>
        </div>
      </section> */}
    </main>
  );
}
