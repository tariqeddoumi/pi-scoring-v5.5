
import { MarketRefVM } from '@/lib/projects/types';

export default function ProjectComparablesBlock({ refs }: { refs: MarketRefVM[] }) {
  return (
    <section className="pi-card">
      <h2>Références comparables</h2>
      {refs.length === 0 ? (
        <div className="pi-highlight-box" style={{marginTop:16}}>Aucune référence comparable n'est encore enregistrée.</div>
      ) : (
        <div className="pi-kpi-band" style={{marginTop:16, gridTemplateColumns:'repeat(2,minmax(0,1fr))'}}>
          {refs.slice(0,4).map((r) => (
            <article key={r.id} className="pi-comparable-card">
              <div style={{display:'flex', justifyContent:'space-between', gap:12}}>
                <strong>{r.refProjectName}</strong>
                <span className="pi-badge pi-badge-muted">{r.refIssueStatus ?? '-'}</span>
              </div>
              <div className="pi-comparable-meta">
                <span>{r.refCity ?? '-'} / {r.refZone ?? '-'}</span>
                <span>{r.refStanding ?? '-'}</span>
                <span>{r.refProjectType ?? '-'}</span>
              </div>
              <div className="pi-comparable-meta">
                <span>{r.refPriceMin ?? '-'} - {r.refPriceMax ?? '-'}</span>
                <span>{r.refFinancedByOurBank ? 'Notre banque' : 'Marché'}</span>
                <span>{r.refSuccessFlag ? 'Réussi' : r.refWatchlistFlag ? 'Sous tension' : 'Référence'}</span>
              </div>
              {r.refComment ? <div className="pi-muted">{r.refComment}</div> : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
