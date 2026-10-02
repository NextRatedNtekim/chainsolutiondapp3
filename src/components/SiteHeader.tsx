"use client";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/config/site";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#types", label: "Complaints" },
  { href: "/#how", label: "How it works" },
  { href: "/#about", label: "About" },
  { href: "/#academics", label: "Offers" },
  { href: "/#faq", label: "FAQs" },
  // { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="wrap header-row">
      <Link href="/" className="brand" onClick={() => setOpen(false)}>
        <span className="brand-mark" aria-hidden>B</span>
        <span className="brand-name">{site.name}</span>
      </Link>

      <nav className="nav" aria-label="Main">
        {links.map((l) => (
          <Link key={l.href} className="link" href={l.href}>{l.label}</Link>
        ))}
        <ThemeToggle />
        <Link href="/care" className="btn small">Get Started</Link>
      </nav>

      <button
        className="icon-btn nav-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open && (
        <div id="mobile-menu" className="mobile-menu glass" role="menu">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="link" role="menuitem" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="mobile-menu-row">
            <ThemeToggle />
            <Link href="/care" className="btn small" onClick={() => setOpen(false)}>Get Started</Link>
          </div>
        </div>
      )}
      </div>
    </header>
  );
}
