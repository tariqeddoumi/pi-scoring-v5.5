
import { ProjectPremiumVM } from '@/lib/projects/types';

export default function ProjectTechnicalLegalBlock({ project }: { project: ProjectPremiumVM }) {
  return (
    <section className="pi-card">
      <h2>Technique / juridique</h2>
      <div className="pi-highlight-box" style={{marginTop:16}}>
        À enrichir dans la prochaine étape avec : statut foncier, autorisations, entreprise travaux, architecte, BET, planning, contraintes et servitudes.
      </div>
      <div className="pi-info-grid" style={{marginTop:16, gridTemplateColumns:'repeat(2,minmax(0,1fr))'}}>
        <div className="pi-info-item"><div className="label">Commentaire analyste</div><div className="value">{project.analystComment ?? '-'}</div></div>
        <div className="pi-info-item"><div className="label">Résumé projet</div><div className="value">{project.summary ?? '-'}</div></div>
      </div>
    </section>
  );
}
