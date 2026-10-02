import { SubjectsForm } from "@/components/SubjectsForm";
import { Steps } from "@/components/Steps";

export default function SubjectsPage() {
  return (
    <main>
      <section className="wrap hero" style={{ paddingBottom: "5rem" }}>
        <p className="eyebrow">Almost done</p>
        <h1 style={{ fontSize: "clamp(2.4rem, 7vw, 4.5rem)" }}>Your subjects</h1>
        <Steps current={3} />
        <SubjectsForm />
      </section>
    </main>
  );
}
