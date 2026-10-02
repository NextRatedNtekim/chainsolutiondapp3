import { Check } from "lucide-react";

const labels = ["Complaint", "Verify", "Subjects"];

export function Steps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol className="steps" aria-label="Progress">
      {labels.map((l, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <li key={l} className={active ? "on" : done ? "done" : ""} aria-current={active ? "step" : undefined}>
            <span className="step-ico" aria-hidden>{done ? <Check size={12} /> : step}</span>
            {l}
          </li>
        );
      })}
    </ol>
  );
}
