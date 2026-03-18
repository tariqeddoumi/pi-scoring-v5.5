
"use client";

import { useMemo, useState } from 'react';
import { LocationPointVM, MarketRefVM, ProjectPremiumVM } from '@/lib/projects/types';

export default function ProjectLocationComparablesDrawer({
  project,
  refs,
  points,
}: {
  project: ProjectPremiumVM;
  refs: MarketRefVM[];
  points: LocationPointVM[];
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'map' | 'similar' | 'benchmarks'>('map');

  const mapPoints = useMemo(() => {
    if (points.length > 0) return points;
    return refs.slice(0, 6).map((r, i) => ({
      id: r.id,
      pointType: r.refFinancedByOurBank ? (r.refWatchlistFlag ? 'bank-risk' : 'bank-ok') : 'market',
      label: r.refProjectName,
      city: r.refCity,
      zone: r.refZone,
      latitude: 33.55 + i * 0.01,
      longitude: -7.65 + i * 0.01,
      standing: r.refStanding,
      issueStatus: r.refIssueStatus,
    }));
  }, [points, refs]);

  return (
    <>
      <button className="pi-primary-btn" onClick={() => setOpen(true)}>
        Carte & projets similaires
      </button>

      {open ? (
        <div className="pi-drawer-overlay" onClick={() => setOpen(false)}>
          <aside className="pi-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="pi-drawer-header">
              <div>
                <p className="pi-eyebrow">Analyse zone & comparables</p>
                <h2 style={{margin:'10px 0 0'}}>Carte & benchmarks — {project.name}</h2>
                <p className="pi-muted" style={{margin:'8px 0 0'}}>{project.city ?? '-'} / {project.zone ?? '-'} • {project.segment ?? '-'}</p>
              </div>
              <button className="pi-secondary-btn" onClick={() => setOpen(false)}>Fermer</button>
            </div>
            <div className="pi-drawer-body">
              <div className="pi-tab-row">
                <button className={`pi-tab-btn ${tab === 'map' ? 'active' : ''}`} onClick={() => setTab('map')}>Carte</button>
                <button className={`pi-tab-btn ${tab === 'similar' ? 'active' : ''}`} onClick={() => setTab('similar')}>Projets similaires</button>
                <button className={`pi-tab-btn ${tab === 'benchmarks' ? 'active' : ''}`} onClick={() => setTab('benchmarks')}>Benchmarks zone</button>
              </div>

              {tab === 'map' && (
                <div className="pi-card" style={{padding:16}}>
                  <div className="pi-map-mock">
                    <div className="pi-map-grid" />
                    {mapPoints.map((p, index) => {
                      const left = `${18 + (index % 3) * 24 + (index * 3)}%`;
                      const top = `${22 + (index % 4) * 16}%`;
                      const klass = p.pointType === 'bank-risk' ? 'bank-risk' : p.pointType === 'bank-ok' ? 'bank-ok' : 'market';
                      return (
                        <div key={p.id} className="pi-map-point" style={{ left, top }}>
                          <div className={`pi-map-dot ${klass}`} />
                          <span>{p.label}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="pi-legend" style={{marginTop:14}}>
                    <span><i style={{background:'var(--success)'}} />Banque – sain</span>
                    <span><i style={{background:'var(--danger)'}} />Banque – sensible</span>
                    <span><i style={{background:'var(--primary)'}} />Référence marché</span>
                  </div>
                </div>
              )}

              {tab === 'similar' && (
                <div className="pi-card" style={{padding:16}}>
                  <table className="pi-compact-table">
                    <thead>
                      <tr>
                        <th>Projet</th>
                        <th>Zone</th>
                        <th>Standing</th>
                        <th>Banque</th>
                        <th>Issue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {refs.map((r) => (
                        <tr key={r.id}>
                          <td>{r.refProjectName}</td>
                          <td>{r.refCity ?? '-'} / {r.refZone ?? '-'}</td>
                          <td>{r.refStanding ?? '-'}</td>
                          <td>{r.refFinancedByOurBank ? 'Notre banque' : r.refFinancedByBank ? 'Autre banque' : 'Marché'}</td>
                          <td>{r.refIssueStatus ?? '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {tab === 'benchmarks' && (
                <div className="pi-card" style={{padding:16}}>
                  <div className="pi-kpi-band">
                    <div className="pi-kpi-mini"><div className="label">Comparables même ville</div><div className="value">{refs.filter(r => r.refCity === project.city).length}</div></div>
                    <div className="pi-kpi-mini"><div className="label">Comparables même zone</div><div className="value">{refs.filter(r => r.refZone === project.zone).length}</div></div>
                    <div className="pi-kpi-mini"><div className="label">Standing comparable</div><div className="value">{refs.filter(r => r.refStanding === project.segment).length}</div></div>
                    <div className="pi-kpi-mini"><div className="label">Références banque sensibles</div><div className="value">{refs.filter(r => r.refFinancedByOurBank && r.refWatchlistFlag).length}</div></div>
                  </div>
                  <div className="pi-highlight-box" style={{marginTop:16}}>
                    À terme, ce bloc servira à remonter automatiquement les projets comparables financés par la banque selon la localisation exacte, le zoning, le standing et le type de projet.
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
