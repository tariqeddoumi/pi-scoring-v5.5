import { PromoterDetail } from "@/lib/promoters/types";

export default function PromoterOverviewPanel({ promoter }: { promoter: PromoterDetail }) {
  const cards = [
    ["Projets réalisés", promoter.completedProjectsCount],
    ["Projets en cours", promoter.ongoingProjectsCount],
    ["Actionnaires", promoter.shareholders.length],
    ["Événements banque", promoter.bankEvents.length],
  ];
  return (
    <section className="pi-card">
      <div className="pi-section-header">
        <h3>Vue d&apos;ensemble</h3>
        <span className={`pi-badge ${promoter.watchlistFlag ? 'pi-badge-warning' : 'pi-badge-success'}`}>
          {promoter.watchlistFlag ? 'Sous surveillance' : 'Relation saine'}
        </span>
      </div>
      <div className="pi-summary-grid">
        {cards.map(([label, value]) => (
          <div key={String(label)} className="pi-summary-card">
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="pi-inline-kpis mt-4">
        <span className="pi-pill">Ville dominante : {promoter.dominantCity ?? '-'}</span>
        <span className="pi-pill">Standing : {promoter.dominantStanding ?? '-'}</span>
        <span className="pi-pill">Spécialisation : {promoter.specialization ?? '-'}</span>
        <span className="pi-pill">Client banque : {promoter.isBankClient ? 'Oui' : 'Non'}</span>
      </div>
    </section>
  );
}
