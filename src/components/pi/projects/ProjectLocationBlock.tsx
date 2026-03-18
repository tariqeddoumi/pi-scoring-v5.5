
import { ProjectPremiumVM } from '@/lib/projects/types';

export default function ProjectLocationBlock({ project }: { project: ProjectPremiumVM }) {
  const items = [
    ['Pays', project.country ?? '-'],
    ['Région', project.region ?? '-'],
    ['Ville', project.city ?? '-'],
    ['District / Quartier', project.district ?? '-'],
    ['Zone', project.zone ?? '-'],
    ['Sous-zone', project.subZone ?? '-'],
    ['Adresse', project.address ?? '-'],
    ['Coordonnées', project.latitude && project.longitude ? `${project.latitude}, ${project.longitude}` : '-'],
  ];
  return (
    <section className="pi-card">
      <h2>Localisation précise</h2>
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
