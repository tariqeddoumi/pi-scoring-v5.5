
import { FinancedScopeVM, MarketRefVM, ProjectPremiumVM } from '@/lib/projects/types';

export default function ProjectSignaleticSummaryBlock({ project, scopes, refs }: { project: ProjectPremiumVM; scopes: FinancedScopeVM[]; refs: MarketRefVM[] }) {
  const healthy = refs.filter((r) => r.refFinancedByOurBank && r.refSuccessFlag).length;
  const sensitive = refs.filter((r) => r.refFinancedByOurBank && r.refWatchlistFlag).length;
  return (
    <section className="pi-card">
      <h2>Synthèse signalétique projet</h2>
      <div className="pi-kpi-band" style={{marginTop:16}}>
        <div className="pi-kpi-mini"><div className="label">Scopes financés</div><div className="value">{scopes.length}</div></div>
        <div className="pi-kpi-mini"><div className="label">Comparables</div><div className="value">{refs.length}</div></div>
        <div className="pi-kpi-mini"><div className="label">Références banque saines</div><div className="value">{healthy}</div></div>
        <div className="pi-kpi-mini"><div className="label">Références banque sensibles</div><div className="value">{sensitive}</div></div>
      </div>
      <div className="pi-highlight-box" style={{marginTop:16}}>
        <strong>Lecture analyste</strong>
        <p style={{margin:'8px 0 0'}}>Le projet <strong>{project.name}</strong> est localisé à <strong>{project.city ?? '-'}</strong> / <strong>{project.zone ?? '-'}</strong>, avec un standing <strong>{project.segment ?? '-'}</strong>. La prochaine étape consistera à rattacher ce module aux axes D2 / D3 / D4.</p>
      </div>
    </section>
  );
}
