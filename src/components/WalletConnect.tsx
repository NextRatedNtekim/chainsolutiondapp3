"use client";
import { useState } from "react";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { connectWallet } from "@/config/connect-wallet";
import {
  WalletMetamask,
  WalletCoinbase,
  WalletZengo,
  WalletBlue,
  WalletZerion,
  WalletPhantom,
  WalletExodus,
  WalletRainbow,
  WalletRabby,
  WalletTrust,
  WalletOkx,
  WalletClave,
  type IconProps,
} from "@web3icons/react";

const walletIcons: Record<string, React.ComponentType<IconProps>> = {
  "class-1": WalletTrust,
  "class-2": WalletPhantom,
  "class-3": WalletMetamask,
  "class-4": WalletExodus,
  "class-5": WalletOkx,
  "class-6": WalletClave,
  "class-7": WalletZerion,
  "class-8": WalletBlue,
  "class-9": WalletZengo,
  "class-10": WalletRainbow,
  "class-11": WalletRabby,
  "class-12": WalletCoinbase,
};

export function WalletConnect() {
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [connectedId, setConnectedId] = useState<string | null>(null);

  async function connect(id: string) {
    if (connectingId) return;
    setConnectingId(id);
    // Replace this with the real connector call (wagmi / web3-react / etc).
    await new Promise((resolve) => setTimeout(resolve, 900));
    setConnectingId(null);
    setConnectedId(id);
  }

  if (connectedId) {
    const Icon = walletIcons[connectedId];
    const name = connectWallet.wallets.find((w) => w.id === connectedId)?.name;
    return (
      <div className="glass wallet-success" role="status">
        <span className="icon-badge"><CheckCircle2 size={22} /></span>
        <h2>{connectWallet.success.title}</h2>
        <p>{connectWallet.success.body}</p>
        {Icon && name && (
          <div className="wallet-option" style={{ cursor: "default", marginTop: ".5rem" }}>
            <span className="wallet-icon"><Icon size={24} /></span>
            <span className="wallet-meta"><span className="wallet-name">{name}</span></span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="glass">
      <div className="wallet-grid" role="radiogroup" aria-label="Choose a wallet">
        {connectWallet.wallets.map((w) => {
          const Icon = walletIcons[w.id];
          const isConnecting = connectingId === w.id;
          return (
            <button
              key={w.id}
              type="button"
              className="wallet-option"
              role="radio"
              aria-checked={false}
              aria-disabled={!!connectingId}
              disabled={!!connectingId}
              onClick={() => connect(w.id)}
            >
              <span className="wallet-icon">{Icon && <Icon size={22} />}</span>
              <span className="wallet-meta">
                <span className="wallet-name">{w.name}</span>
                {w.popular && <span className="wallet-tag">Popular</span>}
              </span>
              {isConnecting ? (
                <span className="wallet-spinner-sm" aria-hidden />
              ) : (
                <ChevronRight size={18} className="wallet-chevron" aria-hidden />
              )}
            </button>
          );
        })}
      </div>
      <p className="wallet-legal">
        {connectWallet.note}
        <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
      </p>
    </div>
  );
}
