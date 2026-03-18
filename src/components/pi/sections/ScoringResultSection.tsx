import type { ScoreSummaryViewModel } from "@/lib/pi/types";

type Props = { scoring: ScoreSummaryViewModel };

export function ScoringResultSection({ scoring }: Props) {
  return (
    <div className="pi-section-stack">
      <div className="pi-domain-cards">
        {scoring.domainScores.map((domain) => (
          <article key={domain.code} className="pi-domain-card">
            <span>{domain.code}</span>
            <strong>{domain.score.toFixed(1)}</strong>
            <p>{domain.label}</p>
          </article>
        ))}
      </div>

      <div className="pi-score-summary-grid">
        <div className="pi-panel-card"><h3>Score économique</h3><div className="pi-big-number">{scoring.scoreEco.toFixed(1)}</div></div>
        <div className="pi-panel-card"><h3>Score ajusté</h3><div className="pi-big-number">{scoring.scoreAdjusted.toFixed(1)}</div></div>
        <div className="pi-panel-card"><h3>Malus D5</h3><div className="pi-big-number">-{scoring.malus.toFixed(1)}</div></div>
        <div className="pi-panel-card"><h3>Grade final</h3><div className="pi-big-number">{scoring.grade ?? "-"}</div></div>
      </div>

      <div className="pi-panel-card">
        <h3>KPI évalués</h3>
        <table className="pi-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Libellé</th>
              <th>Valeur</th>
              <th>Score</th>
              <th>Poids</th>
              <th>Contribution</th>
              <th>Domaine</th>
            </tr>
          </thead>
          <tbody>
            {scoring.kpiScores.map((kpi) => (
              <tr key={kpi.code}>
                <td>{kpi.code}</td>
                <td>{kpi.label}</td>
                <td>{kpi.value ?? "-"}</td>
                <td>{kpi.score.toFixed(1)}</td>
                <td>{kpi.weight.toFixed(2)}</td>
                <td>{kpi.contribution.toFixed(1)}</td>
                <td>{kpi.domainCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
