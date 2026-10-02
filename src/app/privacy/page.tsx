import { site } from "@/config/site";

export const metadata = { title: "Privacy policy" };

export default function Privacy() {
  return (
    <main>
      <section className="wrap">
        <h1>Privacy policy</h1>
        <div className="stack">
          {site.privacy.map((s) => (
            <article key={s.title} className="glass">
              <h2 style={{ fontSize: "1.3rem" }}>{s.title}</h2>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
