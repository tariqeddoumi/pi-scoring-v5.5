import type { ProjectShellViewModel } from "@/lib/pi/types";

type Props = { data: ProjectShellViewModel };

function fmt(value: number | null, suffix = "") {
  if (value === null) return "-";
  return `${value.toLocaleString("fr-MA", { maximumFractionDigits: 2 })}${suffix}`;
}

export function FinancialSection({ data }: Props) {
  return (
    <div className="pi-field-grid">
      <div className="pi-field"><label>Coût total</label><div>{fmt(data.financial.totalCost, " MAD")}</div></div>
      <div className="pi-field"><label>Montant financement</label><div>{fmt(data.financial.financingAmount, " MAD")}</div></div>
      <div className="pi-field"><label>Fonds propres</label><div>{fmt(data.financial.equityAmount, " MAD")}</div></div>
      <div className="pi-field"><label>Fonds propres %</label><div>{fmt(data.financial.equityPct, "%")}</div></div>
      <div className="pi-field"><label>DSCR prévisionnel</label><div>{fmt(data.financial.dscr)}</div></div>
      <div className="pi-field"><label>Taux moyen</label><div>{fmt(data.financial.ratePct, "%")}</div></div>
      <div className="pi-field"><label>Tenor</label><div>{fmt(data.financial.tenorMonths, " mois")}</div></div>
      <div className="pi-field"><label>Couverture garanties</label><div>{fmt(data.financial.guaranteeCoveragePct, "%")}</div></div>
    </div>
  );
}
