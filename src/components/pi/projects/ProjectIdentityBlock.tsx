
import { ProjectPremiumVM } from '@/lib/projects/types';

export default function ProjectIdentityBlock({ project }: { project: ProjectPremiumVM }) {
  const items = [
    ['Code projet', project.projectCode ?? '-'],
    ['Nom commercial', project.projectTradeName ?? '-'],
    ['Promoteur', project.promoter?.tradeName ?? project.promoter?.legalName ?? '-'],
    ['Type dossier', project.fileType ?? '-'],
    ['Résumé', project.summary ?? '-'],
    ['Commentaire analyste', project.analystComment ?? '-'],
  ];

  return (
    <section className="pi-card">
      <h2>Identité projet</h2>
      <div className="pi-info-grid" style={{marginTop:16}}>
        {items.map(([label, value]) => (
          <div key={label} className="pi-info-item">
            <div className="label">{label}</div>
            <div className="value">{value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
