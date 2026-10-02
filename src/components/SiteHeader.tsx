import Link from "next/link";
import { site } from "@/config/site";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  return (
    <header className="glass site-header">
      <Link href="/" className="brand">{site.name}</Link>
      <nav className="nav" aria-label="Main">
        <Link className="link" href="/#about">About</Link>
        <Link className="link" href="/#academics">Academics</Link>
        <Link className="link" href="/#contact">Contact</Link>
        <ThemeToggle />
        <Link href="/care" className="btn small">Get Started</Link>
      </nav>
    </header>
  );
}
