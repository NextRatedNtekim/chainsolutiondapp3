"use client";

import { useEffect, useState } from "react";
import {
  TokenBTC, TokenETH, TokenSOL, TokenXRP, TokenBNB,
  TokenUSDT, TokenDOGE, TokenADA, TokenLTC, TokenLINK,
} from "@web3icons/react";

type Icon = typeof TokenBTC;
type Item = { sym: string; price: number; change: number; icon?: Icon };

// Starting values. They are nudged randomly after mount so the server and
// first client render match (no hydration warning).
const BASE: Item[] = [
  { sym: "BTC", price: 85316.9, change: 0.6, icon: TokenBTC },
  { sym: "ETH", price: 2703.48, change: 0.6, icon: TokenETH },
  { sym: "SOL", price: 142.37, change: 1.4, icon: TokenSOL },
  { sym: "XRP", price: 1.50162, change: 0.9, icon: TokenXRP },
  { sym: "BNB", price: 612.8, change: -0.3, icon: TokenBNB },
  { sym: "USDT", price: 1.0021, change: 0.1, icon: TokenUSDT },
  { sym: "DOGE", price: 0.17342, change: -1.2, icon: TokenDOGE },
  { sym: "ADA", price: 0.58213, change: 2.1, icon: TokenADA },
  { sym: "LTC", price: 70.9214, change: 1.8, icon: TokenLTC },
  { sym: "LINK", price: 14.62, change: -0.7, icon: TokenLINK },
  { sym: "AAPL", price: 227.52, change: 0.4 },
  { sym: "NVDA", price: 131.88, change: 1.9 },
  { sym: "TSLA", price: 248.12, change: -1.1 },
  { sym: "MSFT", price: 421.3, change: 0.2 },
];

function fmt(n: number) {
  if (n >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 1 });
  if (n >= 10) return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (n >= 1) return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  return n.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 5 });
}

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

export function PriceTicker() {
  const [items, setItems] = useState<Item[]>(BASE);
  const [flash, setFlash] = useState<Record<string, "up" | "down">>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // randomise once on mount, then fade the bar in
    setItems(
      BASE.map((i) => ({
        ...i,
        price: i.price * (1 + rand(-0.02, 0.02)),
        change: Math.round(rand(-3, 4) * 10) / 10,
      })),
    );
    setReady(true);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = window.setInterval(() => {
      const picks = new Set<number>();
      while (picks.size < 3) picks.add(Math.floor(Math.random() * BASE.length));
      const next: Record<string, "up" | "down"> = {};
      setItems((prev) =>
        prev.map((it, idx) => {
          if (!picks.has(idx)) return it;
          const pct = rand(-0.6, 0.6);
          next[it.sym] = pct >= 0 ? "up" : "down";
          return {
            ...it,
            price: it.price * (1 + pct / 100),
            change: Math.round((it.change + pct) * 10) / 10,
          };
        }),
      );
      setFlash(next);
      window.setTimeout(() => setFlash({}), 1000);
    }, 2600);

    return () => window.clearInterval(id);
  }, []);

  const list = (k: number) => (
    <ul key={k} className="tk-list" aria-hidden={k === 1 ? true : undefined}>
      {items.map((it) => {
        const Icon = it.icon;
        const up = it.change >= 0;
        return (
          <li key={`${k}-${it.sym}`} className={`tk-item ${flash[it.sym] ?? ""}`}>
            {Icon ? (
              <Icon size={22} variant="branded" className="tk-icon" />
            ) : (
              <span className="tk-badge">{it.sym[0]}</span>
            )}
            <span className="tk-sym">{it.sym}</span>
            <span className="tk-price">$ {fmt(it.price)}</span>
            <span className={`tk-chg ${up ? "up" : "down"}`}>
              {up ? "+" : ""}
              {it.change.toFixed(1)}%
            </span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className={`ticker${ready ? " ready" : ""}`} role="region" aria-label="Market prices">
      <div className="ticker-view">
        <div className="tk-track" aria-hidden>
          {[0, 1].map(list)}
        </div>
      </div>
      <p className="sr-only">
        {items.map((i) => `${i.sym} $${fmt(i.price)} ${i.change.toFixed(1)}%`).join(", ")}
      </p>
    </div>
  );
}
