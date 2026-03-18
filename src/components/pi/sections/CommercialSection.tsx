import type { ProjectShellViewModel } from "@/lib/pi/types";

type Props = { data: ProjectShellViewModel };

function fmt(value: number | null, suffix = "") {
  if (value === null) return "-";
  return `${value.toLocaleString("fr-MA", { maximumFractionDigits: 2 })}${suffix}`;
}

export function CommercialSection({ data }: Props) {
  const commercialScore = data.scoring.domainScores.find((d) => d.code === "D3")?.score ?? 0;

  return (
    <div className="pi-field-grid">
      <div className="pi-field"><label>Précommercialisation</label><div>{fmt(data.commercial.preSalesPct, "%")}</div></div>
      <div className="pi-field"><label>Ventes fermes</label><div>{fmt(data.commercial.firmSalesAmount, " MAD")}</div></div>
      <div className="pi-field"><label>Réservations</label><div>{fmt(data.commercial.reservationsAmount, " MAD")}</div></div>
      <div className="pi-field"><label>Désistements (nombre)</label><div>{fmt(data.commercial.cancellationsCount)}</div></div>
      <div className="pi-field"><label>Désistements (montant)</label><div>{fmt(data.commercial.cancellationsAmount, " MAD")}</div></div>
      <div className="pi-field"><label>Dépôts clients</label><div>{fmt(data.commercial.customerDepositsPct, "%")}</div></div>
      <div className="pi-field"><label>Demande marché</label><div>{fmt(data.commercial.marketDemandScore, "/100")}</div></div>
      <div className="pi-field"><label>Position concurrentielle</label><div>{fmt(data.commercial.competitionPositionScore, "/100")}</div></div>
      <div className="pi-field pi-field-span-2"><label>Score D3 consolidé</label><div>{commercialScore.toFixed(1)} / 100</div></div>
    </div>
  );
}
