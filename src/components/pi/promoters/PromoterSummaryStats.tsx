import { PromoterStats } from "@/lib/promoters/types";

export default function PromoterSummaryStats({ stats }: { stats: PromoterStats }) {
  const items = [
    ["Promoteurs", stats.totalPromoters],
    ["Clients banque", stats.bankClients],
    ["Watchlistés", stats.watchlisted],
    ["Avec incidents", stats.withIncidents],
    ["Projets référencés", stats.referencedProjects],
  ];

  return (
    <div className="pi-summary-grid">
      {items.map(([label, value]) => (
        <div key={String(label)} className="pi-summary-card">
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}
