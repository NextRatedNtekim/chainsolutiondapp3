import Link from "next/link";
import { site } from "@/config/site";
import { Mail, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <p className="brand-mini">{site.name}</p>
        <div className="footer-contact">
          <span><Mail size={14} aria-hidden /> {site.contact.email}</span>
          <span><Phone size={14} aria-hidden /> {site.contact.phone}</span>
        </div>
      </div>
      <div className="wrap">
        <p><Link href="/privacy">Privacy policy</Link></p>
      </div>
    </footer>
  );
}
