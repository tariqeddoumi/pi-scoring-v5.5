"use client";

import { useMemo, useState } from "react";
import { PromoterDetail, PromoterRow, PromoterStats } from "@/lib/promoters/types";
import PromoterToolbar from "./PromoterToolbar";
import PromoterSummaryStats from "./PromoterSummaryStats";
import PromoterTable from "./PromoterTable";
import PromoterFormModal from "./PromoterFormModal";
import DeletePromoterModal from "./DeletePromoterModal";
import PromoterDetailDrawer from "./PromoterDetailDrawer";

type Props = {
  promoters: PromoterRow[];
  details: PromoterDetail[];
  stats: PromoterStats;
};

export default function PromoterModuleShell({ promoters, details, stats }: Props) {
  const [query, setQuery] = useState("");
  const [bankClientFilter, setBankClientFilter] = useState<"all" | "yes" | "no">("all");
  const [watchlistFilter, setWatchlistFilter] = useState<"all" | "yes" | "no">("all");
  const [selected, setSelected] = useState<PromoterDetail | null>(null);
  const [editing, setEditing] = useState<PromoterDetail | null>(null);
  const [deleting, setDeleting] = useState<PromoterDetail | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const filtered = useMemo(() => {
    return details.filter((row) => {
      const text = `${row.promoterCode} ${row.legalName} ${row.tradeName ?? ""} ${row.ice ?? ""} ${row.dominantCity ?? ""}`.toLowerCase();
      const q = query.trim().toLowerCase();
      const matchText = !q || text.includes(q);
      const matchBank = bankClientFilter === "all" || (bankClientFilter === "yes" ? row.isBankClient : !row.isBankClient);
      const matchWatch = watchlistFilter === "all" || (watchlistFilter === "yes" ? row.watchlistFlag : !row.watchlistFlag);
      return matchText && matchBank && matchWatch;
    });
  }, [details, query, bankClientFilter, watchlistFilter]);

  return (
    <main className="pi-promoters-page">
      <div className="pi-promoters-hero">
        <div>
          <span className="pi-eyebrow">Référentiel promoteurs • V5.1</span>
          <h1>Vision promoteur 360°</h1>
          <p>
            Une vue compacte pour piloter la relation banque, les actionnaires, les projets réalisés et les projets en cours.
          </p>
        </div>
        <button className="pi-primary-btn" onClick={() => setShowCreate(true)}>Nouveau promoteur</button>
      </div>

      <PromoterSummaryStats stats={stats} />

      <PromoterToolbar
        query={query}
        onQueryChange={setQuery}
        bankClientFilter={bankClientFilter}
        onBankClientFilterChange={setBankClientFilter}
        watchlistFilter={watchlistFilter}
        onWatchlistFilterChange={setWatchlistFilter}
        onCreate={() => setShowCreate(true)}
      />

      <PromoterTable
        rows={filtered}
        onView={(row) => setSelected(row)}
        onEdit={(row) => setEditing(row)}
        onDelete={(row) => setDeleting(row)}
      />

      <PromoterDetailDrawer promoter={selected} open={!!selected} onClose={() => setSelected(null)} />
      <PromoterFormModal open={showCreate} mode="create" onClose={() => setShowCreate(false)} />
      <PromoterFormModal open={!!editing} mode="edit" promoter={editing} onClose={() => setEditing(null)} />
      <DeletePromoterModal promoter={deleting} open={!!deleting} onClose={() => setDeleting(null)} />
    </main>
  );
}
