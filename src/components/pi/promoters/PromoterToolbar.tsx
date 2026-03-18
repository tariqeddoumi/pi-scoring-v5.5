"use client";

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  bankClientFilter: "all" | "yes" | "no";
  onBankClientFilterChange: (value: "all" | "yes" | "no") => void;
  watchlistFilter: "all" | "yes" | "no";
  onWatchlistFilterChange: (value: "all" | "yes" | "no") => void;
  onCreate: () => void;
};

export default function PromoterToolbar(props: Props) {
  return (
    <div className="pi-card pi-toolbar-grid">
      <input
        className="pi-input"
        placeholder="Rechercher par code, raison sociale, ICE, ville..."
        value={props.query}
        onChange={(e) => props.onQueryChange(e.target.value)}
      />
      <select className="pi-input" value={props.bankClientFilter} onChange={(e) => props.onBankClientFilterChange(e.target.value as any)}>
        <option value="all">Client banque : tous</option>
        <option value="yes">Client banque : oui</option>
        <option value="no">Client banque : non</option>
      </select>
      <select className="pi-input" value={props.watchlistFilter} onChange={(e) => props.onWatchlistFilterChange(e.target.value as any)}>
        <option value="all">Watchlist : tous</option>
        <option value="yes">Watchlist : oui</option>
        <option value="no">Watchlist : non</option>
      </select>
      <button className="pi-secondary-btn" onClick={props.onCreate}>Nouveau promoteur</button>
    </div>
  );
}
