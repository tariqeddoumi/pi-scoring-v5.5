
import { ProjectPremiumPageVM } from '@/lib/projects/types';
import ProjectSignaleticHeader from './ProjectSignaleticHeader';
import ProjectIdentityBlock from './ProjectIdentityBlock';
import ProjectLocationBlock from './ProjectLocationBlock';
import ProjectGlobalNatureBlock from './ProjectGlobalNatureBlock';
import ProjectFinancedScopeBlock from './ProjectFinancedScopeBlock';
import ProjectCommercialBlock from './ProjectCommercialBlock';
import ProjectTechnicalLegalBlock from './ProjectTechnicalLegalBlock';
import ProjectComparablesBlock from './ProjectComparablesBlock';
import ProjectSignaleticSummaryBlock from './ProjectSignaleticSummaryBlock';
import ProjectLocationComparablesDrawer from './ProjectLocationComparablesDrawer';

export default function ProjectSignaleticShell({ data }: { data: ProjectPremiumPageVM }) {
  return (
    <main className="pi-page-container">
      <ProjectSignaleticHeader project={data.project} />

      <section className="pi-card">
        <div className="pi-kpi-band">
          <div className="pi-kpi-mini"><div className="label">Comparables</div><div className="value">{data.marketRefs.length}</div></div>
          <div className="pi-kpi-mini"><div className="label">Scopes financés</div><div className="value">{data.scopes.length}</div></div>
          <div className="pi-kpi-mini"><div className="label">Zone cible</div><div className="value">{data.project.zone ?? '-'}</div></div>
          <div className="pi-kpi-mini"><div className="label">Standing</div><div className="value">{data.project.segment ?? '-'}</div></div>
        </div>
      </section>

      <div className="pi-project-premium-grid">
        <section className="pi-project-premium-main">
          <ProjectIdentityBlock project={data.project} />
          <ProjectLocationBlock project={data.project} />
          <ProjectGlobalNatureBlock project={data.project} />
          <ProjectFinancedScopeBlock scopes={data.scopes} />
          <ProjectCommercialBlock project={data.project} refs={data.marketRefs} />
          <ProjectTechnicalLegalBlock project={data.project} />
          <ProjectComparablesBlock refs={data.marketRefs} />
          <ProjectSignaleticSummaryBlock project={data.project} scopes={data.scopes} refs={data.marketRefs} />
        </section>

        <aside className="pi-project-premium-side">
          <div className="pi-sticky-note">
            <h3>Lecture analyste</h3>
            <p style={{opacity:.9}}>Ce module prépare le lien entre signalétique projet, comparables banque et scoring D2 / D3 / D4.</p>
            <div className="pi-side-metrics" style={{marginTop:14}}>
              <div><dt>Projet</dt><dd>{data.project.name}</dd></div>
              <div><dt>Ville / Zone</dt><dd>{data.project.city ?? '-'} / {data.project.zone ?? '-'}</dd></div>
              <div><dt>Comparables banque</dt><dd>{data.marketRefs.filter(r => r.refFinancedByOurBank).length}</dd></div>
              <div><dt>Points GPS</dt><dd>{data.locationPoints.length}</dd></div>
            </div>
          </div>
          <div className="pi-card">
            <h3>Outils premium</h3>
            <p className="pi-muted" style={{marginTop:8}}>Carte, projets similaires et benchmarks de zone dans un drawer premium dédié.</p>
            <div style={{marginTop:16}}>
              <ProjectLocationComparablesDrawer project={data.project} refs={data.marketRefs} points={data.locationPoints} />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
