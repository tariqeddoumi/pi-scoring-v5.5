"use client";

import { PromoterDetail } from "@/lib/promoters/types";

type Props = {
  rows: PromoterDetail[];
  onView: (row: PromoterDetail) => void;
  onEdit: (row: PromoterDetail) => void;
  onDelete: (row: PromoterDetail) => void;
};

function Badge({ tone = "default", children }: { tone?: "default" | "success" | "warning" | "danger"; children: React.ReactNode }) {
  return <span className={`pi-badge pi-badge-${tone}`}>{children}</span>;
}

export default function PromoterTable({ rows, onView, onEdit, onDelete }: Props) {
  return (
    <div className="pi-card pi-table-wrap">
      <table className="pi-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Raison sociale</th>
            <th>Ville dominante</th>
            <th>Standing</th>
            <th>Réalisés</th>
            <th>En cours</th>
            <th>Client banque</th>
            <th>Watchlist</th>
            <th>Relation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const relationTone = row.litigationFlag ? "danger" : row.restructuringFlag || row.watchlistFlag ? "warning" : "success";
            const relationLabel = row.litigationFlag ? "Contentieux" : row.restructuringFlag ? "Restructuré" : row.watchlistFlag ? "Sous surveillance" : "Saine";
            return (
              <tr key={row.id}>
                <td>{row.promoterCode}</td>
                <td>
                  <div className="pi-cell-title">{row.legalName}</div>
                  <div className="pi-cell-subtitle">{row.tradeName ?? row.specialization ?? "-"}</div>
                </td>
                <td>{row.dominantCity ?? "-"}</td>
                <td>{row.dominantStanding ?? "-"}</td>
                <td>{row.completedProjectsCount}</td>
                <td>{row.ongoingProjectsCount}</td>
                <td>{row.isBankClient ? <Badge tone="success">Oui</Badge> : <Badge>Non</Badge>}</td>
                <td>{row.watchlistFlag ? <Badge tone="warning">Oui</Badge> : <Badge>Non</Badge>}</td>
                <td><Badge tone={relationTone}>{relationLabel}</Badge></td>
                <td>
                  <div className="pi-row-actions">
                    <button onClick={() => onView(row)}>Voir</button>
                    <button onClick={() => onEdit(row)}>Modifier</button>
                    <button className="danger" onClick={() => onDelete(row)}>Supprimer</button>
                  </div>
                </td>
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr><td colSpan={10} className="pi-empty-row">Aucun promoteur ne correspond aux filtres.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
