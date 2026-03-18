import type { AlertViewModel } from "@/lib/pi/types";

type Props = { alerts: AlertViewModel[]; malus: number };

export function AlertsSection({ alerts, malus }: Props) {
  return (
    <div className="pi-section-stack">
      <div className="pi-alert-summary-box">
        <div>
          <span className="pi-muted">Malus total D5</span>
          <strong>{malus.toFixed(1)}</strong>
        </div>
        <div>
          <span className="pi-muted">Nombre d'alertes</span>
          <strong>{alerts.length}</strong>
        </div>
      </div>

      {alerts.length === 0 ? (
        <p className="pi-muted">Aucune alerte D5 active sur la dernière évaluation.</p>
      ) : (
        <ul className="pi-alert-list">
          {alerts.map((alert) => (
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
  );
}
