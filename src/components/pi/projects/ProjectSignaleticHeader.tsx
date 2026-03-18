
import { ProjectPremiumVM } from '@/lib/projects/types';

export default function ProjectSignaleticHeader({ project }: { project: ProjectPremiumVM }) {
  return (
    <section className="pi-card">
      <div className="pi-hero" style={{padding: 0, boxShadow: 'none', border: 'none', background: 'transparent', display:'grid', gridTemplateColumns:'1.55fr .85fr'}}>
        <div>
          <div className="pi-inline-badges">
            <span className="pi-badge">Signalétique Projet Premium</span>
            <span className="pi-badge pi-badge-muted">{project.projectStatus ?? 'Statut à préciser'}</span>
            <span className="pi-badge pi-badge-muted">{project.fileType ?? 'Dossier PI'}</span>
          </div>
          <h1 className="pi-hero-title">{project.name}</h1>
          <p className="pi-hero-subtitle">
            {project.projectCode ?? 'Code non renseigné'} • {project.city ?? 'Ville'} • {project.zone ?? 'Zone'}
          </p>
          <div className="pi-inline-badges">
            <span className="pi-badge">Standing {project.segment ?? '-'}</span>
            <span className="pi-badge">Type {project.type ?? '-'}</span>
            <span className="pi-badge">Mode {project.promotionMode ?? '-'}</span>
          </div>
        </div>
        <div className="pi-hero-scorecard">
          <div className="pi-hero-score-label">Promoteur</div>
          <div className="pi-hero-grade">{project.promoter?.legalName ?? 'Non relié'}</div>
          <div className="pi-hero-score-label" style={{marginTop:16}}>Lecture rapide</div>
          <div className="pi-hero-grade">Projet global / lot financé / comparables</div>
        </div>
      </div>
    </section>
  );
}
