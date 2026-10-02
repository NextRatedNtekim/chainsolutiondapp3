import { site } from "@/config/site";
import { Plus } from "lucide-react";

export function Faq() {
  return (
    <div className="faq">
      {site.faqs.map((f) => (
        <details key={f.q}>
          <summary>
            <span>{f.q}</span>
            <Plus size={18} aria-hidden className="faq-plus" />
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
