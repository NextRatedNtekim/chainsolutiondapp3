import { connectWallet } from "@/config/connect-wallet";
import { WalletConnect } from "@/components/WalletConnect";
import { Lock } from "lucide-react";

export default function ConnectWalletPage() {
  return (
    <main>
      <section className="wrap hero" id="top" style={{ textAlign: "center" }}>
        <div className="hero-inner">
          <p className="eyebrow">{connectWallet.eyebrow}</p>
          <h1 style={{ maxWidth: "14ch" }}>{connectWallet.title}</h1>
          <p className="lead">{connectWallet.subtitle}</p>
          <p className="hero-note"><Lock size={14} aria-hidden /> Your keys stay with you — we never store them.</p>
        </div>
      </section>

      <section className="wrap" style={{ maxWidth: "40rem", paddingBlock: "0 5rem" }}>
        <WalletConnect />
      </section>
    </main>
  );
}
