import { Reveal } from "@/components/Reveal";
import {
  WalletMetamask, WalletCoinbase, WalletZengo, WalletBlue, WalletZerion,
  WalletPhantom, WalletExodus, WalletRainbow, WalletRabby, WalletTrust,
  WalletOkx, WalletClave, WalletAtomic, WalletAmbire, WalletKraken,
  WalletKeplr, WalletSolflare, WalletWalletConnect, WalletArgent, WalletSafe,
  WalletImtoken, WalletTokenPocket, WalletAlfa1, WalletBitbox, WalletUnipass,
  WalletSequence, WalletPillar, WalletGlow, WalletCypherock,
} from "@web3icons/react";

type W = { name: string; Icon: typeof WalletMetamask };

const rowA: W[] = [
  { name: "MetaMask", Icon: WalletMetamask },
  { name: "Coinbase", Icon: WalletCoinbase },
  { name: "Trust", Icon: WalletTrust },
  { name: "Phantom", Icon: WalletPhantom },
  { name: "OKX", Icon: WalletOkx },
  { name: "Rainbow", Icon: WalletRainbow },
  { name: "Rabby", Icon: WalletRabby },
  { name: "Exodus", Icon: WalletExodus },
  { name: "WalletConnect", Icon: WalletWalletConnect },
  { name: "Zerion", Icon: WalletZerion },
  { name: "Safe", Icon: WalletSafe },
  { name: "Argent", Icon: WalletArgent },
  { name: "Kraken", Icon: WalletKraken },
  { name: "Keplr", Icon: WalletKeplr },
  { name: "Solflare", Icon: WalletSolflare },
];

const rowB: W[] = [
  { name: "ZenGo", Icon: WalletZengo },
  { name: "BlueWallet", Icon: WalletBlue },
  { name: "Clave", Icon: WalletClave },
  { name: "Atomic", Icon: WalletAtomic },
  { name: "Ambire", Icon: WalletAmbire },
  { name: "imToken", Icon: WalletImtoken },
  { name: "TokenPocket", Icon: WalletTokenPocket },
  { name: "Alfa1", Icon: WalletAlfa1 },
  { name: "BitBox", Icon: WalletBitbox },
  { name: "UniPass", Icon: WalletUnipass },
  { name: "Sequence", Icon: WalletSequence },
  { name: "Multis", Icon: WalletPillar },
  { name: "Glow", Icon: WalletGlow },
  { name: "Cypherock", Icon: WalletCypherock },
];

function Row({ items, reverse = false }: { items: W[]; reverse?: boolean }) {
  return (
    <div className={`wm-row${reverse ? " rev" : ""}`} aria-hidden>
      <div className="wm-track">
        {[0, 1].map((k) => (
          <ul key={k} className="wm-list">
            {items.map(({ name, Icon }) => (
              <li key={`${k}-${name}`} className="wm-pill">
                <Icon size={28} variant="branded" />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function WalletMarquee() {
  return (
    <section className="wrap frame" id="wallets">
      <Reveal>
        <p className="eyebrow">Wallets</p>
        <h2 className="center-h">Works with the wallets you already use</h2>
      </Reveal>
      <div className="wm">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
      <p className="sr-only">
        {[...rowA, ...rowB].map((w) => w.name).join(", ")}
      </p>
    </section>
  );
}
