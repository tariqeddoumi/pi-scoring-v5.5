import type { SummaryMetricsViewModel } from "@/lib/pi/types";
import { SummaryCard } from "./SummaryCard";

function fmtAmount(value: number | null) {
  if (value === null) return "--";
  return new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }).format(value) + " MAD";
}

function fmtPct(value: number | null) {
  if (value === null) return "--";
  return `${value.toFixed(1)}%`;
}

function fmtRatio(value: number | null) {
  if (value === null) return "--";
  return value.toFixed(2);
}

type ProjectSummaryCardsProps = {
  metrics: SummaryMetricsViewModel;
};

export function ProjectSummaryCards({ metrics }: ProjectSummaryCardsProps) {
  return (
    <section className="pi-summary-grid">
      <SummaryCard label="Coût total" value={fmtAmount(metrics.totalCost)} tone="primary" />
      <SummaryCard label="Financement" value={fmtAmount(metrics.financingAmount)} />
      <SummaryCard label="Fonds propres" value={fmtAmount(metrics.equityAmount)} hint={fmtPct(metrics.equityPct)} tone="success" />
      <SummaryCard label="Précommercialisation" value={fmtPct(metrics.preSalesPct)} tone="warning" />
      <SummaryCard label="Avancement travaux" value={fmtPct(metrics.progressPct)} />
      <SummaryCard label="DSCR" value={fmtRatio(metrics.dscr)} tone="success" />
      <SummaryCard label="Score final" value={metrics.finalScore !== null ? metrics.finalScore.toFixed(1) : "--"} tone="primary" />
      <SummaryCard label="Alertes D5" value={String(metrics.alertsCount)} tone={metrics.alertsCount > 0 ? "danger" : "default"} />
    </section>
  );
}
