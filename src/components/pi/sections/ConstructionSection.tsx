import type { ProjectShellViewModel } from "@/lib/pi/types";

type Props = { data: ProjectShellViewModel };

function fmt(value: number | null, suffix = "") {
  if (value === null) return "-";
  return `${value.toLocaleString("fr-MA", { maximumFractionDigits: 2 })}${suffix}`;
}

export function ConstructionSection({ data }: Props) {
  return (
    <div className="pi-field-grid">
      <div className="pi-field"><label>Avancement travaux</label><div>{fmt(data.construction.workProgressPct, "%")}</div></div>
      <div className="pi-field"><label>Retard chantier</label><div>{fmt(data.construction.constructionDelayMonths, " mois")}</div></div>
      <div className="pi-field"><label>Dérive coût</label><div>{fmt(data.construction.costOverrunPct, "%")}</div></div>
      <div className="pi-field"><label>Qualité entreprise travaux</label><div>{fmt(data.construction.contractorQualityScore, "/100")}</div></div>
      <div className="pi-field pi-field-span-2"><label>Incidents techniques</label><div>{data.construction.technicalIncidentLevel ?? "RAS / non renseigné"}</div></div>
    </div>
  );
}
