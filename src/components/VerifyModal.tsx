"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ShieldCheck, ClipboardList, Search, ChevronLeft, ChevronRight, X, TriangleAlert } from "lucide-react";
import {
  WalletMetamask, WalletCoinbase, WalletZengo, WalletBlue, WalletZerion,
  WalletPhantom, WalletExodus, WalletRainbow, WalletRabby, WalletTrust,
  WalletOkx, WalletClave, WalletAtomic, WalletAmbire, WalletKraken,
  WalletKeplr, WalletSolflare, WalletWalletConnect, WalletArgent, WalletSafe,
  WalletImtoken, WalletTokenPocket, WalletAlfa1, WalletBitbox, WalletUnipass,
  WalletSequence, WalletPillar, WalletGlow, WalletCypherock, WalletAlphaWallet, WalletBackpack, WalletVenly, WalletCoin98, 
  WalletDaimo, WalletEnkrypt, WalletPortal, WalletSender, WalletKukai, WalletMyEtherWallet, WalletPecunityWallet, WalletLit, WalletLedger, WalletObvious, WalletRabbit, WalletRonin, WalletSoul, WalletSquads,
  WalletTemple, WalletTrezor, WalletWallet3, WalletXdefi
} from "@web3icons/react";


type Wallet = { id: string; name: string; Icon: typeof WalletMetamask };
type View = "choose" | "auto" | "connecting" | "unavailable";

const WALLETS: Wallet[] = [
  { id: "metamask", name: "MetaMask", Icon: WalletMetamask },
  { id: "walletconnect", name: "Wallet Connect", Icon: WalletWalletConnect },
  { id: "coinbase", name: "Coinbase", Icon: WalletCoinbase },
  { id: "trust", name: "Trust Wallet", Icon: WalletTrust },
  { id: "okx", name: "OKX Wallet", Icon: WalletOkx },
  { id: "argent", name: "Argent", Icon: WalletArgent },
  { id: "sequence", name: "Sequence", Icon: WalletSequence },
  { id: "rabby", name: "Rabby", Icon: WalletRabby },
  { id: "rainbow", name: "Rainbow", Icon: WalletRainbow },
  { id: "phantom", name: "Phantom", Icon: WalletPhantom },
  { id: "exodus", name: "Exodus", Icon: WalletExodus },
  { id: "clave", name: "Clave", Icon: WalletClave },
  { id: "zerion", name: "Zerion", Icon: WalletZerion },
  { id: "bluewallet", name: "BlueWallet", Icon: WalletBlue },
  { id: "zengo", name: "ZenGo", Icon: WalletZengo },
  { id: "atomic", name: "Atomic", Icon: WalletAtomic },
  { id: "ambire", name: "Ambire", Icon: WalletAmbire },
  { id: "kraken", name: "Kraken", Icon: WalletKraken },
  { id: "keplr", name: "Keplr", Icon: WalletKeplr },
  { id: "solflare", name: "Solflare", Icon: WalletSolflare },
  { id: "safe", name: "Safe", Icon: WalletSafe },
  { id: "imtoken", name: "imToken", Icon: WalletImtoken },
  { id: "tokenpocket", name: "TokenPocket", Icon: WalletTokenPocket },
  { id: "alfa1", name: "Alfa1", Icon: WalletAlfa1 },
  { id: "bitbox", name: "BitBox", Icon: WalletBitbox },
  { id: "unipass", name: "UniPass", Icon: WalletUnipass },
  { id: "multis", name: "Multis", Icon: WalletPillar },
  { id: "glow", name: "Glow", Icon: WalletGlow },
  { id: "cypherock", name: "Cypherock", Icon: WalletCypherock },

  // Previously unused wallet icons
  { id: "backpack", name: "Backpack", Icon: WalletBackpack },
  { id: "venly", name: "Venly", Icon: WalletVenly },
  { id: "coin98", name: "Coin98", Icon: WalletCoin98 },
  { id: "daimo", name: "Daimo", Icon: WalletDaimo },
  { id: "enkrypt", name: "Enkrypt", Icon: WalletEnkrypt },
  { id: "portal", name: "Portal", Icon: WalletPortal },
  { id: "sender", name: "Sender", Icon: WalletSender },
  { id: "kukai", name: "Kukai", Icon: WalletKukai },
  { id: "myetherwallet", name: "MyEther", Icon: WalletMyEtherWallet },
  { id: "pecunity", name: "Pecunity Wallet", Icon: WalletPecunityWallet },
  { id: "lit", name: "Lit", Icon: WalletLit },
  { id: "ledger", name: "Ledger", Icon: WalletLedger },
  { id: "obvious", name: "Obvious", Icon: WalletObvious },
  { id: "rabbit", name: "Rabbit", Icon: WalletRabbit },
  { id: "ronin", name: "Ronin", Icon: WalletRonin },
  { id: "soul", name: "Soul", Icon: WalletSoul },
  { id: "squads", name: "Squads", Icon: WalletSquads },
  { id: "temple", name: "Temple", Icon: WalletTemple },
  { id: "trezor", name: "Trezor", Icon: WalletTrezor },
  { id: "wallet3", name: "Wallet3", Icon: WalletWallet3 },
  { id: "xdefi", name: "XDEFI", Icon: WalletXdefi },
];

const PER_SLIDE = 9;

export function VerifyModal() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("choose");
  const [query, setQuery] = useState("");
  const [slide, setSlide] = useState(0);
  const [picked, setPicked] = useState<Wallet | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return WALLETS;
    return WALLETS.filter((w) => w.name.toLowerCase().includes(q));
  }, [query]);

  const searching = query.trim().length > 0;
  const slideCount = Math.max(1, Math.ceil(filtered.length / PER_SLIDE));
  const clampedSlide = Math.min(slide, slideCount - 1);

  function openModal() {
    setView("choose");
    setQuery("");
    setSlide(0);
    setPicked(null);
    setOpen(true);
  }

  function choose(w: Wallet) {
    setPicked(w);
    setView("connecting");
    // Simulated connection attempt — automatic connect is not wired up yet,
    // so every pick resolves to the "unavailable" screen below.
    window.setTimeout(() => setView("unavailable"), 1700);
  }

  function backToAuto() {
    setPicked(null);
    setQuery("");
    setSlide(0);
    setView("auto");
  }

  return (
    <>
      <button className="btn" onClick={openModal}>
        <ShieldCheck size={18} /> Connect wallet
      </button>

      {open && (
        <div className="vm-overlay" role="dialog" aria-modal="true" aria-label="Connect your wallet">
          <div className="glass vm-modal">
            <div className="wc-head">
              <h2>
                {view === "choose" && "Connect a wallet"}
                {view === "auto" && "Choose a wallet"}
                {view === "connecting" && "Connecting"}
                {view === "unavailable" && "Automatic connect"}
              </h2>
              <button type="button" className="icon-btn" aria-label="Close" onClick={() => setOpen(false)}>
                <X size={16} />
              </button>
            </div>

            {view === "choose" && (
              <div className="stack">
                <p>Connect your wallet securely to continue. We only use the connection to help identify the right support option.</p>
                <button type="button" className="btn" onClick={() => setView("auto")}>
                  <ShieldCheck size={18} /> Connect automatically
                </button>
                <Link href="/manualconnect" className="btn ghost">
                  <ClipboardList size={18} /> Connect manually
                </Link>
                <p className="center-p note">
                  <Link href="/privacy">Privacy policy</Link>
                </p>
              </div>
            )}

            {view === "auto" && (
              <>
                <div className="wc-search">
                  <Search size={16} aria-hidden />
                  <input
                    type="search"
                    value={query}
                    placeholder="Search wallets"
                    aria-label="Search wallets"
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSlide(0);
                    }}
                  />
                </div>

                <div className="wc-carousel">
                  <div
                    className={`wc-track${searching ? " wc-track-static" : ""}`}
                    style={searching ? undefined : { transform: `translateX(-${clampedSlide * 100}%)` }}
                  >
                    {searching ? (
                      <ul className="wc-grid">
                        {filtered.map((w) => (
                          <WalletTile key={w.id} wallet={w} onPick={choose} />
                        ))}
                        {filtered.length === 0 && <p className="wc-empty">No wallets match "{query}".</p>}
                      </ul>
                    ) : (
                      Array.from({ length: slideCount }, (_, s) => (
                        <ul className="wc-grid" key={s}>
                          {filtered.slice(s * PER_SLIDE, s * PER_SLIDE + PER_SLIDE).map((w) => (
                            <WalletTile key={w.id} wallet={w} onPick={choose} />
                          ))}
                        </ul>
                      ))
                    )}
                  </div>
                </div>

                {!searching && slideCount > 1 && (
                  <div className="wc-nav">
                    <button
                      type="button"
                      className="icon-btn"
                      disabled={clampedSlide === 0}
                      onClick={() => setSlide((s) => Math.max(0, s - 1))}
                      aria-label="Previous wallets"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className="wc-dots" aria-hidden>
                      {Array.from({ length: slideCount }, (_, i) => (
                        <i key={i} className={i === clampedSlide ? "on" : ""} />
                      ))}
                    </span>
                    <button
                      type="button"
                      className="icon-btn"
                      disabled={clampedSlide === slideCount - 1}
                      onClick={() => setSlide((s) => Math.min(slideCount - 1, s + 1))}
                      aria-label="More wallets"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </>
            )}

            {view === "connecting" && picked && (
              <div className="wc-connecting-inline" role="status" aria-live="polite">
                <span className="wc-pulse">
                  <picked.Icon size={44} variant="branded" />
                </span>
                <h3>Connecting to {picked.name}…</h3>
                <p>Approve the request in your wallet to continue.</p>
              </div>
            )}

            {view === "unavailable" && (
              <div className="vm-unavailable" role="status">
                <span className="vm-warn-badge">
                  <TriangleAlert size={22} />
                </span>
                <h3>Automatic connection isn't available right now</h3>
                <p>
                  {picked ? `We couldn't complete the connection to ${picked.name}.` : "We couldn't complete the automatic connection."}{" "}
                  No problem — continue manually by providing your wallet address instead.
                </p>
                <div className="actions center">
                  <Link href="/manualconnect" className="btn">
                     Continue manually
                  </Link>
                  <button type="button" className="btn ghost" onClick={backToAuto}>
                    Try again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function WalletTile({ wallet, onPick }: { wallet: Wallet; onPick: (w: Wallet) => void }) {
  const { Icon, name } = wallet;
  return (
    <li>
      <button type="button" className="wc-tile" onClick={() => onPick(wallet)}>
        <Icon size={32} variant="branded" />
        <span>{name}</span>
      </button>
    </li>
  );
}
