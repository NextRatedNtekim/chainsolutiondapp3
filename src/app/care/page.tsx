import { site } from "@/config/site";
import { ComplaintForm } from "@/components/ComplaintForm";
import { Steps } from "@/components/Steps";

export default function CarePage() {
  return (
    <main>
      <section className="wrap hero" style={{ paddingBottom: "5rem" }}>
        <p className="eyebrow">Customer care</p>
        <h1 style={{ fontSize: "clamp(2.4rem, 7vw, 4.5rem)" }}>{site.care.title}</h1>
        <p className="lead">{site.care.intro}</p>
        <Steps current={1} />
        <ComplaintForm />
      </section>
    </main>
  );
}
