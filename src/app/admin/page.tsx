import Link from "next/link";
import { getSql } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { site } from "@/config/site";

type Complaint = { id: string; body: string; created_at: string };
type Submission = { id: string; class_id: string; subjects: string[]; created_at: string };
const when = (d: string) => new Date(d).toLocaleString();

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  await requireAdmin();
  const tab = (await searchParams).tab === "subjects" ? "subjects" : "complaints";
  const sql = getSql();
  const complaints = tab === "complaints" ? ((await sql`SELECT id, body, created_at FROM complaints ORDER BY created_at DESC LIMIT 500`) as Complaint[]) : [];
  const subs = tab === "subjects" ? ((await sql`SELECT id, class_id, subjects, created_at FROM subject_submissions ORDER BY created_at DESC LIMIT 500`) as Submission[]) : [];

  return (
    <main>
      <section className="wrap">
        <h1>Submissions</h1>
        <div style={{ display: "flex", gap: ".75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <Link href="/admin?tab=complaints" className={tab === "complaints" ? "btn" : "btn ghost"}>Complaints</Link>
          <Link href="/admin?tab=subjects" className={tab === "subjects" ? "btn" : "btn ghost"}>Subjects</Link>
          <form action="/api/admin/logout" method="post"><button className="btn ghost">Sign out</button></form>
        </div>
        <div className="stack">
          {tab === "complaints" && (complaints.length === 0 ? <p>No complaints yet.</p> : complaints.map((c) => (
            <article key={c.id} className="glass"><p style={{ whiteSpace: "pre-wrap", color: "var(--fg)" }}>{c.body}</p><p>{when(c.created_at)}</p></article>
          )))}
          {tab === "subjects" && (subs.length === 0 ? <p>No subject submissions yet.</p> : subs.map((s) => (
            <article key={s.id} className="glass">
              <h2 style={{ fontSize: "1.2rem" }}>{site.classes.find((c) => c.id === s.class_id)?.label ?? s.class_id}</h2>
              <p style={{ color: "var(--fg)" }}>{s.subjects.join(", ")}</p><p>{when(s.created_at)}</p>
            </article>
          )))}
        </div>
      </section>
    </main>
  );
}
