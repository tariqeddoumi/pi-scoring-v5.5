"use client";

import { PromoterDetail } from "@/lib/promoters/types";
import PromoterOverviewPanel from "./PromoterOverviewPanel";
import PromoterIdentityBlock from "./PromoterIdentityBlock";
import PromoterShareholdersBlock from "./PromoterShareholdersBlock";
import PromoterCompletedProjectsBlock from "./PromoterCompletedProjectsBlock";
import PromoterOngoingProjectsBlock from "./PromoterOngoingProjectsBlock";
import PromoterBankRelationshipBlock from "./PromoterBankRelationshipBlock";
import PromoterRiskSummaryBlock from "./PromoterRiskSummaryBlock";

type Props = { promoter?: PromoterDetail | null; open: boolean; onClose: () => void };

export default function PromoterDetailDrawer({ promoter, open, onClose }: Props) {
  if (!open || !promoter) return null;
  return (
    <div className="pi-drawer-overlay" onClick={onClose}>
      <aside className="pi-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="pi-drawer-header">
          <div>
            <span className="pi-eyebrow">Fiche promoteur</span>
            <h2>{promoter.legalName}</h2>
            <p>{promoter.promoterCode} • {promoter.tradeName ?? promoter.promoterType ?? "Promoteur"}</p>
          </div>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="pi-drawer-body">
          <PromoterOverviewPanel promoter={promoter} />
          <PromoterIdentityBlock promoter={promoter} />
          <PromoterShareholdersBlock shareholders={promoter.shareholders} />
          <PromoterCompletedProjectsBlock projects={promoter.completedProjects} />
          <PromoterOngoingProjectsBlock projects={promoter.ongoingProjects} />
          <PromoterBankRelationshipBlock promoter={promoter} bankEvents={promoter.bankEvents} />
          <PromoterRiskSummaryBlock promoter={promoter} />
        </div>
      </aside>
    </div>
  );
}
