import type { ScoreSummaryViewModel } from "@/lib/pi/types";
import { ScoringRadar } from "@/components/pi/charts/ScoringRadar";

type StickyScoringPanelProps = {
  scoring: ScoreSummaryViewModel;
};

function riskTone(score: number | null) {
  if (score === null) return "default";
  if (score >= 80) return "success";
  if (score >= 65) return "primary";
  if (score >= 50) return "warning";
  return "danger";
}

export function StickyScoringPanel({ scoring }: StickyScoringPanelProps) {
  const tone = riskTone(scoring.finalScore);

  return (
    <aside className="pi-sticky-panel">
      <div className={`pi-score-hero pi-tone-${tone}`}>
        <div className="pi-score-hero-label">Notation projet</div>
        <div className="pi-score-hero-value">{scoring.finalScore !== null ? scoring.finalScore.toFixed(1) : "--"}</div>
        <div className="pi-score-hero-grade">Grade {scoring.grade ?? "-"}</div>
        <div className="pi-score-hero-risk">{scoring.riskLevel}</div>
      </div>

      <div className="pi-panel-card">
        <h3>Radar scoring D1 à D5</h3>
        <ScoringRadar domains={scoring.domainScores} />
      </div>

      <div className="pi-panel-card">
        <h3>Détail des domaines</h3>
        <div className="pi-domain-list">
          {scoring.domainScores.map((domain) => (
            <div key={domain.code} className="pi-domain-row">
              <div className="pi-domain-meta">
                <span>{domain.code}</span>
                <strong>{domain.score.toFixed(1)}</strong>
              </div>
              <div className="pi-progress-track">
                <div className="pi-progress-fill" style={{ width: `${Math.max(0, Math.min(domain.score, 100))}%` }} />
              </div>
              <div className="pi-domain-label">{domain.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pi-panel-card">
        <h3>Ajustements</h3>
        <dl className="pi-side-metrics">
          <div><dt>Score économique</dt><dd>{scoring.scoreEco.toFixed(1)}</dd></div>
          <div><dt>Score ajusté</dt><dd>{scoring.scoreAdjusted.toFixed(1)}</dd></div>
          <div><dt>Alpha segment</dt><dd>{scoring.alpha.toFixed(2)}</dd></div>
          <div><dt>Beta zone</dt><dd>{scoring.beta.toFixed(2)}</dd></div>
          <div><dt>Malus D5</dt><dd>{scoring.malus.toFixed(1)}</dd></div>
        </dl>
      </div>

      <div className="pi-panel-card">
        <h3>Alertes clés</h3>
        {scoring.alerts.length === 0 ? (
          <p className="pi-muted">Aucune alerte D5 active.</p>
        ) : (
          <ul className="pi-alert-list">
            {scoring.alerts.map((alert) => (
              <li key={alert.code} className={`pi-alert-item pi-alert-${alert.severity}`}>
                <div>
                  <strong>{alert.code}</strong>
                  <p>{alert.label}</p>
                </div>
                <span>-{alert.malus.toFixed(1)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pi-panel-card">
        <h3>Actions</h3>
        <div className="pi-action-stack">
          <a className="pi-primary-btn" href="#scoring-result">Voir le détail du scoring</a>
          <a className="pi-secondary-btn" href="#history">Consulter l'historique</a>
          <a className="pi-secondary-btn" href="#analyst-decision">Préparer la recommandation</a>
        </div>
      </div>
    </aside>
  );
}
