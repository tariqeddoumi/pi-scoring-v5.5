import type { BankingViewModel } from "@/lib/pi/types";

type Props = { banking: BankingViewModel };

function fmt(v: number | null, suffix = "") { return v === null ? "-" : `${v.toLocaleString("fr-MA", { maximumFractionDigits: 1 })}${suffix}`; }

export function BankingRelationshipSection({ banking }: Props) {
  return (
    <div className="pi-field-grid">
      <div className="pi-field"><label>Ancienneté relation</label><div>{fmt(banking.relationshipYears, " ans")}</div></div>
      <div className="pi-field"><label>Comportement bancaire</label><div>{fmt(banking.bankingConductScore, "/100")}</div></div>
      <div className="pi-field"><label>Centralisation flux</label><div>{fmt(banking.centralizationPct, "%")}</div></div>
      <div className="pi-field"><label>Incidents observés</label><div>{fmt(banking.incidentsCount)}</div></div>
    </div>
  );
}
