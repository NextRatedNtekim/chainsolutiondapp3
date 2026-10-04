import { site } from "@/config/site";
import { Steps } from "@/components/Steps";
import { VerifyModal } from "@/components/VerifyModal";

export default function VerifyPage() {
  return (
    <main>
      <section className="wrap hero" style={{ paddingBottom: "5rem" }}>
        <p className="eyebrow">Secure blockchain access</p>
        {/* <h1 style={{ fontSize: "clamp(2.4rem, 7vw, 4.5rem)" }}>{site.verify.title}</h1> */}
        {/* <p className="lead">{site.verify.intro}</p> */}
        <Steps current={1} />
        <div className="glass stack">
          <h2>Connect to Chain Solution</h2>
          <p>Choose how you'd like to securely connect and continue with our blockchain solutions.</p>
          <VerifyModal />
        </div>
      </section>
    </main>
  );
}
