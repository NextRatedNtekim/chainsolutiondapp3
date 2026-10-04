import Link from "next/link";
import { site } from "@/config/site";
import { Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p className="brand-mini">
            <span className="brand-mark" aria-hidden>B</span> {site.name}
          </p>
          <p className="footer-blurb">{site.description}</p>
        </div>
        <nav aria-label="Footer" className="footer-links">
          <Link href="/verify">Get started</Link>
          <Link href="/#types">Complaint types</Link>
          <Link href="/#how">How it works</Link>
          <Link href="/#faq">FAQs</Link>
          <Link href="/privacy">Privacy policy</Link>
        </nav>
        {/* <div className="footer-contact">
          <span><Mail size={14} aria-hidden /> {site.contact.email}</span>
          <span><Phone size={14} aria-hidden /> {site.contact.phone}</span>
          <span><MapPin size={14} aria-hidden /> {site.contact.address}</span>
        </div> */}
      </div>
      <div className="wrap footer-base">
        {/* <p>{site.extra}</p> */}
      </div>
    </footer>
  );
}
