
import { FinancedScopeVM } from '@/lib/projects/types';

export default function ProjectFinancedScopeBlock({ scopes }: { scopes: FinancedScopeVM[] }) {
  return (
    <section className="pi-card">
      <h2>Périmètre financé</h2>
      {scopes.length === 0 ? (
        <div className="pi-highlight-box" style={{marginTop:16}}>
          Aucun lot / tranche / composante financée n'est encore renseigné. Ce bloc doit devenir central dans la lecture crédit.
        </div>
      ) : (
        <div style={{marginTop:16, overflowX:'auto'}}>
          <table className="pi-compact-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Code</th>
                <th>Libellé</th>
                <th>Coût</th>
                <th>CA</th>
                <th>Financement</th>
                <th>% Projet</th>
                <th>Progression</th>
              </tr>
            </thead>
            <tbody>
              {scopes.map((s) => (
                <tr key={s.id}>
                  <td>{s.scopeType}</td>
                  <td>{s.scopeCode ?? '-'}</td>
                  <td>{s.scopeLabel}</td>
                  <td>{s.scopeCost ?? '-'}</td>
                  <td>{s.scopeRevenue ?? '-'}</td>
                  <td>{s.scopeFinancingAmount ?? '-'}</td>
                  <td>{s.scopeShareOfProjectPct ?? '-'}%</td>
                  <td>{s.scopeProgressPct ?? '-'}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
