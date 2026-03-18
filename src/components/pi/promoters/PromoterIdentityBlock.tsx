import { PromoterDetail } from "@/lib/promoters/types";

export default function PromoterIdentityBlock({ promoter }: { promoter: PromoterDetail }) {
  const rows = [
    ["Raison sociale", promoter.legalName],
    ["Nom commercial", promoter.tradeName ?? '-'],
    ["ICE", promoter.ice ?? '-'],
    ["RC", promoter.rc ?? '-'],
    ["Forme juridique", promoter.legalForm ?? '-'],
    ["Groupe", promoter.groupName ?? '-'],
    ["Type promoteur", promoter.promoterType ?? '-'],
    ["Expérience PI", promoter.piExperienceYears ? `${promoter.piExperienceYears} ans` : '-'],
    ["Contact principal", promoter.mainContactName ?? '-'],
    ["Fonction", promoter.mainContactRole ?? '-'],
    ["Téléphone", promoter.phone ?? '-'],
    ["Email", promoter.email ?? '-'],
  ];
  return (
    <section className="pi-card">
      <div className="pi-section-header"><h3>Identité détaillée</h3></div>
      <div className="pi-detail-grid">
        {rows.map(([label, value]) => (
          <div key={String(label)} className="pi-detail-item">
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      {promoter.analystComment && <p className="pi-analyst-note">{promoter.analystComment}</p>}
    </section>
  );
}
