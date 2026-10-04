import Link from "next/link";
import { site } from "@/config/site";
import {
  ArrowRight, Replace, Gift, PiggyBank, ListChecks, ArrowLeftRight, Fuel, TrendingDown,
  Shuffle, Image as ImageIcon, Lock, KeyRound, ShieldCheck, Server, Wallet, Sprout,
  BadgeCheck, Clock, Link2, AlertTriangle, Repeat2, PackageOpen, Coins, ArrowUpCircle,
  MessagesSquare,
} from "lucide-react";

const services = [
  { title: "Migration", body: "Move your assets to a new wallet or chain without losing a step.", icon: Replace },
  { title: "Claim", body: "Submit and track reward or refund claims in one place.", icon: Gift },
  { title: "Staking", body: "Stake your tokens and start earning yield, safely.", icon: PiggyBank },
  { title: "Whitelist", body: "Check your whitelist status or request access to a sale.", icon: ListChecks },
  { title: "Swap", body: "Swap tokens across chains with clear rates and no surprises.", icon: ArrowLeftRight },
  { title: "Gas/Network", body: "Troubleshoot stuck transactions caused by gas spikes or network congestion.", icon: Fuel },
  { title: "Slippage", body: "Understand and reduce slippage on your trades.", icon: TrendingDown },
  { title: "Cross Transfer", body: "Move funds between wallets and exchanges without the guesswork.", icon: Shuffle },
  { title: "NFTs", body: "Mint, transfer, or recover NFTs stuck in your wallet.", icon: ImageIcon },
  { title: "Locked Account", body: "Unlock a frozen or restricted account and get back in.", icon: Lock },
  { title: "Login Error", body: "Fix sign-in issues with your wallet or dashboard.", icon: KeyRound },
  { title: "Assets Recovery", body: "Recover assets sent to the wrong address or a compromised wallet.", icon: ShieldCheck },
  { title: "Node Issues", body: "Diagnose node downtime or sync problems affecting your transactions.", icon: Server },
  { title: "Wallet Glitch", body: "Resolve wallet bugs, display errors, or sync issues.", icon: Wallet },
  { title: "Defi Farming", body: "Get your yield farming positions working the way they should.", icon: Sprout },
  { title: "Validation", body: "Verify a transaction, contract, or wallet before you commit funds.", icon: BadgeCheck },
  { title: "Transaction Delay", body: "Find out why a transaction is pending and how to speed it up.", icon: Clock },
  { title: "Bridging", body: "Bridge assets between chains without losing track of them.", icon: Link2 },
  { title: "Missing/Irregular Balance", body: "Investigate a balance that looks wrong or has gone missing.", icon: AlertTriangle },
  { title: "Exchange", body: "Get help with deposits, withdrawals, or trades on supported exchanges.", icon: Repeat2 },
  { title: "Claim Airdrop", body: "Check eligibility and claim your airdrop before it expires.", icon: PackageOpen },
  { title: "Buy Token", body: "Get step-by-step help purchasing tokens securely.", icon: Coins },
  { title: "Sell Token", body: "Sell tokens with confidence and avoid common pitfalls.", icon: ArrowUpCircle },
];

export default function ExplorePage() {
  return (
    <main>
      {/* HERO */}
      <section className="wrap hero" id="top" style={{ textAlign: "center" }}>
        <div className="hero-inner">
          <p className="eyebrow">Explore</p>
          <h1 style={{ maxWidth: "16ch" }}>Explore {site.name}</h1>
          <p className="lead">
            Step into a world built for discovery. From staking to swaps, bridges to recovery,
            {" "}{site.name} puts every tool you need for decentralized finance within reach.
          </p>
          <div className="actions center">
            <Link href="#services" className="btn lg">Explore Services <ArrowRight size={18} aria-hidden /></Link>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="wrap frame" id="services">
        <p className="eyebrow">Explore Services</p>
        <h2 className="center-h" style={{ maxWidth: "26ch" }}>What do you need help with today?</h2>
        <p className="center-p">Pick a topic below and we&rsquo;ll walk you through it, step by step.</p>
        <div className="grid cols-3" style={{ marginTop: "2.5rem" }}>
          {services.map((s) => (
            <div key={s.title} className="cell">
              <span className="icon-badge"><s.icon size={20} /></span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="actions">
                <Link href="/verify" className="btn ghost small">
                  Click here
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GET IN TOUCH */}
      <section id="get-in-touch" className="wrap cta-wrap">
        <div className="art art-sunset cta">
          <div className="cta-inner">
            <span className="icon-badge"><MessagesSquare size={22} /></span>
            <h2>Get in touch</h2>
            <p>Connect with us by becoming a part of our Discord community.</p>
            <a href="https://discord.gg/your-invite" target="_blank" rel="noreferrer" className="btn lg">
              Join our Discord <ArrowRight size={18} aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
