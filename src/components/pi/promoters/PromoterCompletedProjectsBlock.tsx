import { PromoterDetail } from "@/lib/promoters/types";

export default function PromoterCompletedProjectsBlock({ projects }: { projects: PromoterDetail['completedProjects'] }) {
  return (
    <section className="pi-card">
      <div className="pi-section-header"><h3>Projets réalisés</h3></div>
      <div className="pi-table-wrap">
        <table className="pi-table pi-table-compact">
          <thead><tr><th>Projet</th><th>Ville</th><th>Standing</th><th>Banque</th><th>Notre banque</th><th>Issue</th></tr></thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>{p.projectName}</td>
                <td>{p.city ?? '-'}</td>
                <td>{p.standing ?? '-'}</td>
                <td>{p.financingBankName ?? '-'}</td>
                <td>{p.financedByOurBank ? 'Oui' : 'Non'}</td>
                <td>{p.outcomeStatus ?? '-'}</td>
              </tr>
            ))}
            {projects.length === 0 && <tr><td colSpan={6} className="pi-empty-row">Aucun projet livré référencé.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}
