import type { AnalystViewModel, ScoreSummaryViewModel } from "@/lib/pi/types";

type Props = { analyst: AnalystViewModel; scoring: ScoreSummaryViewModel };

export function AnalystDecisionSection({ analyst, scoring }: Props) {
  return (
    <div className="pi-section-stack">
      <div className="pi-field-grid">
        <div className="pi-field"><label>Recommandation</label><div>{analyst.recommendation ?? (scoring.finalScore !== null && scoring.finalScore >= 65 ? "Favorable sous conditions" : "À renforcer")}</div></div>
        <div className="pi-field"><label>Niveau de risque</label><div>{scoring.riskLevel}</div></div>
        <div className="pi-field pi-field-span-2"><label>Commentaire analyste</label><div>{analyst.comments ?? "Commentaires non renseignés."}</div></div>
      </div>
      <div className="pi-panel-card">
        <h3>Prochaines étapes proposées</h3>
        <ul className="pi-bullets">
          {analyst.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
