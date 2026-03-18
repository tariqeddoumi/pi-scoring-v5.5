import { PromoterDetail } from "@/lib/promoters/types";

export default function PromoterBankRelationshipBlock({ promoter, bankEvents }: { promoter: PromoterDetail; bankEvents: PromoterDetail['bankEvents'] }) {
  return (
    <section className="pi-card">
      <div className="pi-section-header"><h3>Relation bancaire</h3></div>
      <div className="pi-detail-grid">
        <div className="pi-detail-item"><span>Client banque</span><strong>{promoter.isBankClient ? 'Oui' : 'Non'}</strong></div>
        <div className="pi-detail-item"><span>Ancienneté relation</span><strong>{promoter.bankRelationshipYears ? `${promoter.bankRelationshipYears} ans` : '-'}</strong></div>
        <div className="pi-detail-item"><span>Watchlist</span><strong>{promoter.watchlistFlag ? 'Oui' : 'Non'}</strong></div>
        <div className="pi-detail-item"><span>Restructuration</span><strong>{promoter.restructuringFlag ? 'Oui' : 'Non'}</strong></div>
        <div className="pi-detail-item"><span>Contentieux</span><strong>{promoter.litigationFlag ? 'Oui' : 'Non'}</strong></div>
      </div>
      <div className="pi-table-wrap mt-4">
        <table className="pi-table pi-table-compact">
          <thead><tr><th>Date</th><th>Événement</th><th>Gravité</th><th>Résolu</th><th>Commentaire</th></tr></thead>
          <tbody>
            {bankEvents.map((e) => (
              <tr key={e.id}>
                <td>{new Date(e.eventDate).toLocaleDateString()}</td>
                <td>{e.eventType}</td>
                <td>{e.severity ?? '-'}</td>
                <td>{e.resolvedFlag ? 'Oui' : 'Non'}</td>
                <td>{e.comment ?? '-'}</td>
              </tr>
            ))}
            {bankEvents.length === 0 && <tr><td colSpan={5} className="pi-empty-row">Aucun événement bancaire enregistré.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}
