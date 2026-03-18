import { ProjectHeader } from "@/components/pi/header/ProjectHeader";
import { ProjectSummaryCards } from "@/components/pi/summary/ProjectSummaryCards";
import { AccordionSection } from "@/components/pi/ui/AccordionSection";
import { StickyScoringPanel } from "@/components/pi/scoring/StickyScoringPanel";
import { ProjectIdentitySection } from "@/components/pi/sections/ProjectIdentitySection";
import { SponsorSection } from "@/components/pi/sections/SponsorSection";
import { FinancialSection } from "@/components/pi/sections/FinancialSection";
import { CommercialSection } from "@/components/pi/sections/CommercialSection";
import { ConstructionSection } from "@/components/pi/sections/ConstructionSection";
import { GuaranteesSection } from "@/components/pi/sections/GuaranteesSection";
import { BankingRelationshipSection } from "@/components/pi/sections/BankingRelationshipSection";
import { ScoringParametersSection } from "@/components/pi/sections/ScoringParametersSection";
import { ScoringResultSection } from "@/components/pi/sections/ScoringResultSection";
import { AlertsSection } from "@/components/pi/sections/AlertsSection";
import { HistorySection } from "@/components/pi/history/HistorySection";
import { AnalystDecisionSection } from "@/components/pi/sections/AnalystDecisionSection";
import type { ProjectShellViewModel } from "@/lib/pi/types";

type Props = {
  data: ProjectShellViewModel;
};

export function ProjectScoringShell({ data }: Props) {
  return (
    <div className="pi-page-shell">
      <ProjectHeader project={data.project} scoring={data.scoring} />
      <ProjectSummaryCards metrics={data.summary} />

      <div className="pi-main-grid">
        <div className="pi-main-column">
          <AccordionSection title="Signalétique projet" subtitle="Références du dossier, localisation, segment et typologie." defaultOpen status="complete">
            <ProjectIdentitySection project={data.project} />
          </AccordionSection>

          <AccordionSection title="Promoteur / Sponsor" subtitle="Expérience, historique, qualité de sponsor et relation bancaire." defaultOpen status="partial">
            <SponsorSection sponsor={data.sponsor} />
          </AccordionSection>

          <AccordionSection title="Structure financière" subtitle="Montants, fonds propres, DSCR, garanties et couverture financière." defaultOpen status="partial">
            <FinancialSection data={data} />
          </AccordionSection>

          <AccordionSection title="Commercialisation / Préventes" subtitle="Précommercialisation, ventes fermes, réservations et désistements." defaultOpen status="partial">
            <CommercialSection data={data} />
          </AccordionSection>

          <AccordionSection title="Avancement chantier" subtitle="Avancement physique, délais, dérives et qualité d'exécution." defaultOpen status="partial">
            <ConstructionSection data={data} />
          </AccordionSection>

          <AccordionSection title="Garanties & sûretés" subtitle="Couverture des sûretés et qualité du package de garantie." defaultOpen status="partial">
            <GuaranteesSection guarantees={data.guarantees} />
          </AccordionSection>

          <AccordionSection title="Relation bancaire / comportement" subtitle="Ancienneté relation, centralisation et incidents observés." defaultOpen status="partial">
            <BankingRelationshipSection banking={data.banking} />
          </AccordionSection>

          <AccordionSection title="Paramètres du modèle" subtitle="Version, segment, zone et hypothèses de calcul appliquées." defaultOpen status="complete">
            <ScoringParametersSection parameters={data.parameters} />
          </AccordionSection>

          <div id="scoring-result">
            <AccordionSection title="Résultat scoring détaillé" subtitle="Scores D1 à D5, KPI évalués et lecture du moteur V4.1." defaultOpen status="complete">
              <ScoringResultSection scoring={data.scoring} />
            </AccordionSection>
          </div>

          <AccordionSection title="Alertes D5 / Red flags" subtitle="Vigilances, critiques, triggers hard et malus appliqués." defaultOpen status={data.scoring.alerts.length > 0 ? "partial" : "complete"}>
            <AlertsSection alerts={data.scoring.alerts} malus={data.scoring.malus} />
          </AccordionSection>

          <div id="history">
            <AccordionSection title="Historique des évaluations" subtitle="Traçabilité complète et lecture dynamique du dossier." defaultOpen status={data.history.length > 0 ? "complete" : "missing"}>
              <HistorySection items={data.history} />
            </AccordionSection>
          </div>

          <div id="analyst-decision">
            <AccordionSection title="Décision analyste" subtitle="Recommandation synthétique et prochaines étapes." defaultOpen status="partial">
              <AnalystDecisionSection analyst={data.analyst} scoring={data.scoring} />
            </AccordionSection>
          </div>
        </div>

        <div className="pi-side-column">
          <StickyScoringPanel scoring={data.scoring} />
        </div>
      </div>
    </div>
  );
}
