const labels = ["Complaint", "Verify", "Subjects"];

export function Steps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol className="steps" aria-label="Progress">
      {labels.map((l, i) => (
        <li key={l} className={i + 1 === current ? "on" : ""} aria-current={i + 1 === current ? "step" : undefined}>{i + 1}. {l}</li>
      ))}
    </ol>
  );
}
