export const dynamic = "force-dynamic";

import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { loadModelFromDb } from "@/lib/domain/loadModelFromDb";
import { computeScoring, type ScoringInputs } from "@/lib/domain/scoringEngine";

type PageProps = {
  params: Promise<{ id: string }>;
};

function num(formData: FormData, key: string, fallback = 0) {
  const raw = formData.get(key)?.toString();
  const value = Number(raw);
  return Number.isFinite(value) ? value : fallback;
}

export default async function ProjectEvaluatePage({ params }: PageProps) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      evaluations: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  if (!project) notFound();

  const lastInputs = ((project.evaluations[0]?.inputs ?? {}) as Record<string, unknown>);

  async function submitEvaluation(formData: FormData) {
    "use server";

    const projectId = formData.get("projectId")?.toString();
    const modelCode = formData.get("modelCode")?.toString() || "PI_2026Q1";
    if (!projectId) throw new Error("Project ID manquant.");

    const inputs: ScoringInputs = {
      segment: formData.get("segment")?.toString() || "",
      zone: formData.get("zone")?.toString() || "",
      sponsorName: formData.get("sponsorName")?.toString() || project.name,
      sponsorExperienceScore: num(formData, "sponsorExperienceScore"),
      sponsorTrackRecordScore: num(formData, "sponsorTrackRecordScore"),
      relationBankScore: num(formData, "relationBankScore"),
      sponsorComment: formData.get("sponsorComment")?.toString() || "",
      marketDemandScore: num(formData, "marketDemandScore"),
      competitionPositionScore: num(formData, "competitionPositionScore"),
      preCommercialisationPct: num(formData, "preCommercialisationPct"),
      firmSalesAmount: num(formData, "firmSalesAmount"),
      reservationsAmount: num(formData, "reservationsAmount"),
      cancellationsCount: num(formData, "cancellationsCount"),
      cancellationsAmount: num(formData, "cancellationsAmount"),
      customerDepositsPct: num(formData, "customerDepositsPct"),
      workProgressPct: num(formData, "workProgressPct"),
      constructionDelayMonths: num(formData, "constructionDelayMonths"),
      costOverrunPct: num(formData, "costOverrunPct"),
      contractorQualityScore: num(formData, "contractorQualityScore"),
      technicalIncidentLevel: formData.get("technicalIncidentLevel")?.toString() || "RAS",
      equityPct: num(formData, "equityPct"),
      dscr: num(formData, "dscr"),
      ratePct: num(formData, "ratePct"),
      tenorMonths: num(formData, "tenorMonths"),
      guaranteeCoveragePct: num(formData, "guaranteeCoveragePct"),
      packageQualityScore: num(formData, "packageQualityScore"),
      hardeningLevel: formData.get("hardeningLevel")?.toString() || "Standard",
      relationshipYears: num(formData, "relationshipYears"),
      bankingConductScore: num(formData, "bankingConductScore"),
      centralizationPct: num(formData, "centralizationPct"),
      incidentsCount: num(formData, "incidentsCount"),
      analystRecommendation: formData.get("analystRecommendation")?.toString() || "",
      analystComments: formData.get("analystComments")?.toString() || "",
      d5Triggers: [],
    };

    const model = await loadModelFromDb(modelCode);
    const scoring = computeScoring({ model, inputs });

    const evaluation = await prisma.evaluation.create({
      data: {
        projectId,
        modelCode,
        status: "draft",
        inputs,
        results: scoring,
        finalScore: scoring.finalScore,
        grade: scoring.grade,
      },
    });

    redirect(`/evaluations/${evaluation.id}`);
  }

  return (
    <main className="pi-page-container">
      <div className="pi-top-actions">
        <a href={`/projects/${project.id}`} className="pi-text-link">← Retour au dossier</a>
      </div>

      <section className="pi-hero">
        <div>
          <div className="pi-breadcrumbs"><span>Évaluation V4.1</span><span>•</span><span>{project.projectCode ?? project.name}</span></div>
          <h1 className="pi-hero-title">Nouvelle évaluation promotion immobilière</h1>
          <p className="pi-hero-subtitle">Formulaire enrichi sponsor / marché / commercialisation / construction / garanties / relation bancaire.</p>
          <div className="pi-inline-badges">
            <span className="pi-badge">{project.city ?? "Ville non renseignée"}</span>
            <span className="pi-badge">{project.zone ?? "Zone non renseignée"}</span>
            <span className="pi-badge">{project.segment ?? "Segment à préciser"}</span>
          </div>
        </div>
        <div className="pi-hero-scorecard">
          <div className="pi-hero-score-label">Dernière évaluation</div>
          <div className="pi-hero-score-value">{project.evaluations[0]?.finalScore ? Number(project.evaluations[0].finalScore).toFixed(1) : "--"}</div>
          <div className="pi-hero-grade">{project.evaluations[0]?.grade ?? "Aucune notation"}</div>
        </div>
      </section>

      <form action={submitEvaluation} className="pi-eval-form">
        <input type="hidden" name="projectId" value={project.id} />
        <input type="hidden" name="modelCode" value="PI_2026Q1" />
        <input type="hidden" name="segment" value={project.segment ?? ""} />
        <input type="hidden" name="zone" value={project.zone ?? ""} />

        <section className="pi-form-card">
          <h2>Sponsor / Promoteur</h2>
          <div className="pi-field-grid">
            <div className="pi-form-field"><label>Nom sponsor</label><input name="sponsorName" defaultValue={String(lastInputs.sponsorName ?? project.name)} /></div>
            <div className="pi-form-field"><label>Commentaire sponsor</label><input name="sponsorComment" defaultValue={String(lastInputs.sponsorComment ?? "")} /></div>
            <div className="pi-form-field"><label>Expérience promoteur (0-100)</label><input name="sponsorExperienceScore" type="number" defaultValue={String(lastInputs.sponsorExperienceScore ?? 70)} /></div>
            <div className="pi-form-field"><label>Track record (0-100)</label><input name="sponsorTrackRecordScore" type="number" defaultValue={String(lastInputs.sponsorTrackRecordScore ?? 70)} /></div>
            <div className="pi-form-field pi-field-span-2"><label>Relation banque (0-100)</label><input name="relationBankScore" type="number" defaultValue={String(lastInputs.relationBankScore ?? 65)} /></div>
          </div>
        </section>

        <section className="pi-form-card">
          <h2>Marché & commercialisation</h2>
          <div className="pi-field-grid">
            <div className="pi-form-field"><label>Demande marché (0-100)</label><input name="marketDemandScore" type="number" defaultValue={String(lastInputs.marketDemandScore ?? 70)} /></div>
            <div className="pi-form-field"><label>Position concurrentielle (0-100)</label><input name="competitionPositionScore" type="number" defaultValue={String(lastInputs.competitionPositionScore ?? 65)} /></div>
            <div className="pi-form-field"><label>Précommercialisation (%)</label><input name="preCommercialisationPct" type="number" step="0.01" defaultValue={String(lastInputs.preCommercialisationPct ?? 50)} /></div>
            <div className="pi-form-field"><label>Ventes fermes (MAD)</label><input name="firmSalesAmount" type="number" step="0.01" defaultValue={String(lastInputs.firmSalesAmount ?? 1500000)} /></div>
            <div className="pi-form-field"><label>Réservations (MAD)</label><input name="reservationsAmount" type="number" step="0.01" defaultValue={String(lastInputs.reservationsAmount ?? 500000)} /></div>
            <div className="pi-form-field"><label>Désistements (nombre)</label><input name="cancellationsCount" type="number" defaultValue={String(lastInputs.cancellationsCount ?? 0)} /></div>
            <div className="pi-form-field"><label>Désistements (MAD)</label><input name="cancellationsAmount" type="number" step="0.01" defaultValue={String(lastInputs.cancellationsAmount ?? 0)} /></div>
            <div className="pi-form-field"><label>Dépôts clients (%)</label><input name="customerDepositsPct" type="number" step="0.01" defaultValue={String(lastInputs.customerDepositsPct ?? 10)} /></div>
          </div>
        </section>

        <section className="pi-form-card">
          <h2>Construction & exécution</h2>
          <div className="pi-field-grid">
            <div className="pi-form-field"><label>Avancement travaux (%)</label><input name="workProgressPct" type="number" step="0.01" defaultValue={String(lastInputs.workProgressPct ?? 40)} /></div>
            <div className="pi-form-field"><label>Retard chantier (mois)</label><input name="constructionDelayMonths" type="number" step="0.01" defaultValue={String(lastInputs.constructionDelayMonths ?? 0)} /></div>
            <div className="pi-form-field"><label>Dérive coût (%)</label><input name="costOverrunPct" type="number" step="0.01" defaultValue={String(lastInputs.costOverrunPct ?? 0)} /></div>
            <div className="pi-form-field"><label>Qualité entreprise travaux (0-100)</label><input name="contractorQualityScore" type="number" defaultValue={String(lastInputs.contractorQualityScore ?? 70)} /></div>
            <div className="pi-form-field pi-field-span-2"><label>Niveau incidents techniques</label><input name="technicalIncidentLevel" defaultValue={String(lastInputs.technicalIncidentLevel ?? "RAS")} /></div>
          </div>
        </section>

        <section className="pi-form-card">
          <h2>Financier & garanties</h2>
          <div className="pi-field-grid">
            <div className="pi-form-field"><label>Fonds propres (%)</label><input name="equityPct" type="number" step="0.01" defaultValue={String(lastInputs.equityPct ?? 20)} /></div>
            <div className="pi-form-field"><label>DSCR</label><input name="dscr" type="number" step="0.01" defaultValue={String(lastInputs.dscr ?? 1.2)} /></div>
            <div className="pi-form-field"><label>Taux moyen (%)</label><input name="ratePct" type="number" step="0.01" defaultValue={String(lastInputs.ratePct ?? 5.5)} /></div>
            <div className="pi-form-field"><label>Tenor (mois)</label><input name="tenorMonths" type="number" step="1" defaultValue={String(lastInputs.tenorMonths ?? 24)} /></div>
            <div className="pi-form-field"><label>Couverture garanties (%)</label><input name="guaranteeCoveragePct" type="number" step="0.01" defaultValue={String(lastInputs.guaranteeCoveragePct ?? 80)} /></div>
            <div className="pi-form-field"><label>Qualité package sûretés (0-100)</label><input name="packageQualityScore" type="number" defaultValue={String(lastInputs.packageQualityScore ?? 65)} /></div>
            <div className="pi-form-field pi-field-span-2"><label>Niveau de hardening</label><input name="hardeningLevel" defaultValue={String(lastInputs.hardeningLevel ?? "Standard")} /></div>
          </div>
        </section>

        <section className="pi-form-card">
          <h2>Relation bancaire & décision analyste</h2>
          <div className="pi-field-grid">
            <div className="pi-form-field"><label>Ancienneté relation (ans)</label><input name="relationshipYears" type="number" step="0.01" defaultValue={String(lastInputs.relationshipYears ?? 5)} /></div>
            <div className="pi-form-field"><label>Comportement bancaire (0-100)</label><input name="bankingConductScore" type="number" defaultValue={String(lastInputs.bankingConductScore ?? 70)} /></div>
            <div className="pi-form-field"><label>Centralisation flux (%)</label><input name="centralizationPct" type="number" step="0.01" defaultValue={String(lastInputs.centralizationPct ?? 70)} /></div>
            <div className="pi-form-field"><label>Incidents observés</label><input name="incidentsCount" type="number" defaultValue={String(lastInputs.incidentsCount ?? 0)} /></div>
            <div className="pi-form-field"><label>Recommandation analyste</label><input name="analystRecommendation" defaultValue={String(lastInputs.analystRecommendation ?? "Favorable sous conditions")} /></div>
            <div className="pi-form-field pi-field-span-2"><label>Commentaires analyste</label><textarea name="analystComments" defaultValue={String(lastInputs.analystComments ?? "")} rows={4} /></div>
          </div>
        </section>

        <div className="pi-form-actions">
          <button type="submit" className="pi-primary-btn">Calculer et enregistrer l'évaluation</button>
        </div>
      </form>
    </main>
  );
}
