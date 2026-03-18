
import { ProjectPremiumVM } from '@/lib/projects/types';

export default function ProjectGlobalNatureBlock({ project }: { project: ProjectPremiumVM }) {
  const metrics = [
    ['Type projet', project.type ?? '-'],
    ['Typologie dominante', project.dominantTypology ?? '-'],
    ['Clientèle cible', project.targetClientele ?? '-'],
    ['Terrain (m²)', project.landArea?.toString() ?? '-'],
    ['Construit (m²)', project.builtArea?.toString() ?? '-'],
    ['Vendable (m²)', project.saleableArea?.toString() ?? '-'],
    ['Unités', project.unitsCount?.toString() ?? '-'],
    ['Blocs', project.blocksCount?.toString() ?? '-'],
    ['Parkings', project.parkingCount?.toString() ?? '-'],
  ];

  return (
    <section className="pi-card">
      <h2>Nature du projet global</h2>
      <div className="pi-kpi-band" style={{marginTop:16, gridTemplateColumns:'repeat(3,minmax(0,1fr))'}}>
        {metrics.map(([label, value]) => (
          <div key={label} className="pi-kpi-mini">
            <div className="label">{label}</div>
            <div className="value">{value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
