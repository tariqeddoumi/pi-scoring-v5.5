type SummaryCardProps = {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "success" | "warning" | "danger" | "primary";
};

export function SummaryCard({ label, value, hint, tone = "default" }: SummaryCardProps) {
  return (
    <article className={`pi-summary-card pi-tone-${tone}`}>
      <div className="pi-summary-label">{label}</div>
      <div className="pi-summary-value">{value}</div>
      {hint ? <div className="pi-summary-hint">{hint}</div> : null}
    </article>
  );
}
