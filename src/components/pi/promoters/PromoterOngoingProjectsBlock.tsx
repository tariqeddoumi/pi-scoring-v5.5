import { PromoterDetail } from "@/lib/promoters/types";

export default function PromoterOngoingProjectsBlock({ projects }: { projects: PromoterDetail['ongoingProjects'] }) {
  return (
    <section className="pi-card">
      <div className="pi-section-header"><h3>Projets en cours</h3></div>
      <div className="pi-table-wrap">
        <table className="pi-table pi-table-compact">
          <thead><tr><th>Projet</th><th>Ville</th><th>Standing</th><th>Avancement</th><th>Préco.</th><th>Situation</th></tr></thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>{p.projectName}</td>
                <td>{p.city ?? '-'}</td>
                <td>{p.standing ?? '-'}</td>
                <td>{p.workProgressPct != null ? `${p.workProgressPct}%` : '-'}</td>
                <td>{p.precommercialisationPct != null ? `${p.precommercialisationPct}%` : '-'}</td>
                <td>{p.situationStatus ?? '-'}</td>
              </tr>
            ))}
            {projects.length === 0 && <tr><td colSpan={6} className="pi-empty-row">Aucun projet en cours référencé.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}
