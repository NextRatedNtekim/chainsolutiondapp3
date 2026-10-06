"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import { WALLETS, type Wallet } from "@/lib/wallets";

const PER_SLIDE = 12;

export function WalletConnect() {
  const [query, setQuery] = useState("");
  const [slide, setSlide] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return WALLETS;
    return WALLETS.filter((w) => w.name.toLowerCase().includes(q));
  }, [query]);

  const searching = query.trim().length > 0;
  const slideCount = Math.max(1, Math.ceil(filtered.length / PER_SLIDE));
  const clampedSlide = Math.min(slide, slideCount - 1);

  return (
    <div className="glass wc-modal">
      <div className="wc-head">
        <h2>Connect a wallet</h2>
        <Link href="/" aria-label="Close" className="icon-btn">
          <X size={16} />
        </Link>
      </div>

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
                <WalletTile key={w.id} wallet={w} />
              ))}
              {filtered.length === 0 && <p className="wc-empty">No wallets match "{query}".</p>}
            </ul>
          ) : (
            Array.from({ length: slideCount }, (_, s) => (
              <ul className="wc-grid" key={s}>
                {filtered.slice(s * PER_SLIDE, s * PER_SLIDE + PER_SLIDE).map((w) => (
                  <WalletTile key={w.id} wallet={w} />
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

      <p className="center-p note">
        <Link href="/privacy">Privacy policy</Link>
      </p>
    </div>
  );
}

function WalletTile({ wallet }: { wallet: Wallet }) {
  const { Icon, name, id } = wallet;
  return (
    <li>
      <Link href={`/connect/${id}`} className="wc-tile">
        <Icon size={32} variant="branded" />
        <span>{name}</span>
      </Link>
    </li>
  );
}
