import { PromoterDetail } from "@/lib/promoters/types";

export default function PromoterRiskSummaryBlock({ promoter }: { promoter: PromoterDetail }) {
  const strengths = [] as string[];
  const risks = [] as string[];

  if (promoter.completedProjectsCount >= 5) strengths.push('Track record confirmé');
  if (promoter.isBankClient && !promoter.watchlistFlag) strengths.push('Relation banque saine');
  if (promoter.shareholders.some((s) => s.isBankClient && !s.incidentFlag)) strengths.push('Actionnariat bancaire plutôt rassurant');

  if (promoter.watchlistFlag) risks.push('Promoteur actuellement en watchlist');
  if (promoter.restructuringFlag) risks.push('Historique de restructuration');
  if (promoter.litigationFlag) risks.push('Contentieux ou litige recensé');
  if (promoter.ongoingProjects.some((p) => p.watchlistFlag || p.incidentFlag)) risks.push('Présence de projets en cours sous tension');

  const riskLevel = promoter.litigationFlag ? 'Élevé' : promoter.watchlistFlag || promoter.restructuringFlag ? 'Sensible' : 'Modéré / faible';

  return (
    <section className="pi-card">
      <div className="pi-section-header"><h3>Synthèse risque promoteur</h3><span className="pi-badge pi-badge-primary">{riskLevel}</span></div>
      <div className="pi-two-cols">
        <div>
          <h4>Points forts</h4>
          <ul className="pi-bullet-list">
            {strengths.length ? strengths.map((x) => <li key={x}>{x}</li>) : <li>À documenter</li>}
          </ul>
        </div>
        <div>
          <h4>Points de vigilance</h4>
          <ul className="pi-bullet-list">
            {risks.length ? risks.map((x) => <li key={x}>{x}</li>) : <li>Aucun signal critique immédiat</li>}
          </ul>
        </div>
      </div>
      {promoter.analystComment && <p className="pi-analyst-note">{promoter.analystComment}</p>}
    </section>
  );
}
