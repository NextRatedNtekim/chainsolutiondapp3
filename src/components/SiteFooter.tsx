import Link from "next/link";
import { site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p>{site.name} · {site.contact.email} · {site.contact.phone}</p>
        <p><Link href="/privacy">Privacy policy</Link></p>
      </div>
    </footer>
  );
}
