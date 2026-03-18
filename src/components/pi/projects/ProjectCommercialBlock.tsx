
import { MarketRefVM, ProjectPremiumVM } from '@/lib/projects/types';

export default function ProjectCommercialBlock({ project, refs }: { project: ProjectPremiumVM; refs: MarketRefVM[] }) {
  const sameZone = refs.filter((r) => r.refZone === project.zone).length;
  const sameStanding = refs.filter((r) => r.refStanding === project.segment).length;
  const byOurBank = refs.filter((r) => r.refFinancedByOurBank).length;
  return (
    <section className="pi-card">
      <h2>Commercial / marché</h2>
      <div className="pi-kpi-band" style={{marginTop:16}}>
        <div className="pi-kpi-mini"><div className="label">Comparables même zone</div><div className="value">{sameZone}</div></div>
        <div className="pi-kpi-mini"><div className="label">Comparables même standing</div><div className="value">{sameStanding}</div></div>
        <div className="pi-kpi-mini"><div className="label">Références de notre banque</div><div className="value">{byOurBank}</div></div>
        <div className="pi-kpi-mini"><div className="label">Standing cible</div><div className="value">{project.segment ?? '-'}</div></div>
      </div>
    </section>
  );
}
