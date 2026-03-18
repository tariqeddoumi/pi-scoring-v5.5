import type { ProjectViewModel } from "@/lib/pi/types";

type Props = { project: ProjectViewModel };

export function ProjectIdentitySection({ project }: Props) {
  return (
    <div className="pi-field-grid">
      <div className="pi-field"><label>Nom projet</label><div>{project.name}</div></div>
      <div className="pi-field"><label>Code projet</label><div>{project.projectCode ?? "-"}</div></div>
      <div className="pi-field"><label>Ville</label><div>{project.city ?? "-"}</div></div>
      <div className="pi-field"><label>Zone</label><div>{project.zone ?? "-"}</div></div>
      <div className="pi-field"><label>Segment</label><div>{project.segment ?? "-"}</div></div>
      <div className="pi-field"><label>Type</label><div>{project.type ?? "-"}</div></div>
      <div className="pi-field"><label>Devise</label><div>{project.currency ?? "-"}</div></div>
      <div className="pi-field"><label>Créé le</label><div>{new Date(project.createdAt).toLocaleDateString()}</div></div>
    </div>
  );
}
