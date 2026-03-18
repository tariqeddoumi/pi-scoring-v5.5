import Link from "next/link";
import type { ProjectViewModel, ScoreSummaryViewModel } from "@/lib/pi/types";

type ProjectHeaderProps = {
  project: ProjectViewModel;
  scoring: ScoreSummaryViewModel;
};

export function ProjectHeader({ project, scoring }: ProjectHeaderProps) {
  return (
    <header className="pi-hero">
      <div>
        <div className="pi-breadcrumbs">
          <Link href="/projects">Projets</Link>
          <span>•</span>
          <span>Scoring Promotion Immobilière V4.1</span>
        </div>
        <h1 className="pi-hero-title">{project.name}</h1>
        <p className="pi-hero-subtitle">
          {project.projectCode ?? "Code non renseigné"} • {project.city ?? "Ville non renseignée"} • {project.zone ?? "Zone non renseignée"}
        </p>
        <div className="pi-inline-badges">
          <span className="pi-badge">{project.segment ?? "Segment à préciser"}</span>
          <span className="pi-badge">{project.type ?? "Type à préciser"}</span>
          <span className="pi-badge">{scoring.modelCode}</span>
          <span className="pi-badge pi-badge-muted">{scoring.status}</span>
        </div>
        <div className="pi-home-actions pi-header-actions">
          <Link href={`/projects/${project.id}/evaluate`} className="pi-primary-btn">Nouvelle évaluation</Link>
          <Link href="/evaluations" className="pi-secondary-btn">Voir les évaluations</Link>
        </div>
      </div>

      <div className="pi-hero-scorecard">
        <div className="pi-hero-score-label">Score global</div>
        <div className="pi-hero-score-value">
          {scoring.finalScore !== null ? scoring.finalScore.toFixed(1) : "--"}
        </div>
        <div className="pi-hero-grade">Grade {scoring.grade ?? "-"}</div>
        <div className="pi-hero-risk-pill">{scoring.riskLevel}</div>
      </div>
    </header>
  );
}
