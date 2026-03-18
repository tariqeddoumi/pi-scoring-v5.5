import Link from "next/link";
import type { HistoryItemViewModel } from "@/lib/pi/types";
import { EvaluationTimeline } from "@/components/pi/charts/EvaluationTimeline";

type Props = { items: HistoryItemViewModel[] };

export function HistorySection({ items }: Props) {
  if (items.length === 0) {
    return <p className="pi-muted">Aucune évaluation enregistrée pour ce dossier.</p>;
  }

  return (
    <div className="pi-history-grid">
      <div className="pi-panel-card">
        <h3>Timeline des évaluations</h3>
        <EvaluationTimeline items={items} />
      </div>
      <div className="pi-panel-card">
        <h3>Journal détaillé</h3>
        <table className="pi-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Modèle</th>
              <th>Score</th>
              <th>Grade</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.modelCode}</td>
                <td>{item.finalScore !== null ? item.finalScore.toFixed(1) : "-"}</td>
                <td>{item.grade ?? "-"}</td>
                <td>{item.status}</td>
                <td><Link href={`/evaluations/${item.id}`}>Ouvrir</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
