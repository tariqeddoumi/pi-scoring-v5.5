import { PromoterDetail } from "@/lib/promoters/types";

export default function PromoterShareholdersBlock({ shareholders }: { shareholders: PromoterDetail['shareholders'] }) {
  return (
    <section className="pi-card">
      <div className="pi-section-header"><h3>Actionnariat</h3></div>
      <div className="pi-table-wrap">
        <table className="pi-table pi-table-compact">
          <thead><tr><th>Actionnaire</th><th>%</th><th>Type</th><th>Client banque</th><th>Relation</th><th>Alertes</th></tr></thead>
          <tbody>
            {shareholders.map((s) => (
              <tr key={s.id}>
                <td>{s.shareholderName}</td>
                <td>{s.ownershipPct ?? '-'}</td>
                <td>{s.shareholderType ?? '-'}</td>
                <td>{s.isBankClient ? 'Oui' : 'Non'}</td>
                <td>{s.bankRelationshipStatus ?? '-'}</td>
                <td>{s.watchlistFlag || s.incidentFlag || s.litigationFlag ? 'À surveiller' : 'RAS'}</td>
              </tr>
            ))}
            {shareholders.length === 0 && <tr><td colSpan={6} className="pi-empty-row">Aucun actionnaire référencé.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}
