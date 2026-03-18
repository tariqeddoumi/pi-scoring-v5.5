import type { Evaluation, Project } from "@prisma/client";
import type {
  AnalystViewModel,
  AlertViewModel,
  BankingViewModel,
  CommercialViewModel,
  ConstructionViewModel,
  DomainScoreViewModel,
  FinancialViewModel,
  GuaranteesViewModel,
  HistoryItemViewModel,
  KpiScoreViewModel,
  ParametersViewModel,
  ProjectShellViewModel,
  ProjectViewModel,
  ScoreSummaryViewModel,
  SponsorViewModel,
  SummaryMetricsViewModel,
} from "@/lib/pi/types";

function n(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function s(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const out = String(value).trim();
  return out ? out : null;
}

function formatIso(date: Date | string | null | undefined): string | null {
  if (!date) return null;
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

export function mapProject(project: Project): ProjectViewModel {
  return {
    id: project.id,
    name: project.name,
    projectCode: project.projectCode,
    city: project.city,
    zone: project.zone,
    segment: project.segment,
    type: project.type,
    currency: project.currency,
    totalCost: n(project.totalCost),
    financingAmount: n(project.financingAmount),
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };
}

export function mapHistory(evaluations: Evaluation[]): HistoryItemViewModel[] {
  return evaluations.map((evaluation) => ({
    id: evaluation.id,
    date: evaluation.createdAt.toISOString(),
    modelCode: evaluation.modelCode,
    finalScore: n(evaluation.finalScore),
    grade: evaluation.grade,
    status: evaluation.status,
  }));
}

function getInputs(latestEvaluation: Evaluation | null) {
  return ((latestEvaluation?.inputs ?? {}) as Record<string, unknown>);
}

function extractAlerts(evaluation: Evaluation | null): AlertViewModel[] {
  if (!evaluation) return [];
  const results = (evaluation.results ?? {}) as Record<string, unknown>;
  const raw = Array.isArray(results.alerts)
    ? (results.alerts as Array<Record<string, unknown>>)
    : [];

  return raw.map((item) => ({
    code: String(item.code ?? item.triggerCode ?? "ALERT"),
    label: String(item.label ?? "Alerte"),
    severity: String(item.severity ?? "vigilance"),
    malus: n(item.malus) ?? 0,
    source: s(item.source) ?? undefined,
  }));
}

function extractDomainScores(results: Record<string, unknown>): DomainScoreViewModel[] {
  const labels: Record<string, string> = {
    D1: "Promoteur / Sponsor",
    D2: "Marché / Environnement",
    D3: "Structure & Commercialisation",
    D4: "Couverture financière",
    D5: "Alertes / Malus",
  };

  const raw = Array.isArray(results.domainResults) ? results.domainResults as Array<Record<string, unknown>> : [];

  return raw.map((item) => ({
    code: String(item.code ?? ""),
    label: labels[String(item.code ?? "")] ?? String(item.code ?? "D?"),
    score: n(item.score) ?? 0,
    weight: n(item.weight) ?? 0,
  }));
}

function extractKpis(results: Record<string, unknown>): KpiScoreViewModel[] {
  const raw = Array.isArray(results.kpiResults) ? results.kpiResults as Array<Record<string, unknown>> : [];
  return raw.map((item) => ({
    code: String(item.code ?? ""),
    label: String(item.label ?? item.code ?? "KPI"),
    value: typeof item.value === "number" || typeof item.value === "string" ? item.value : n(item.value),
    score: n(item.score) ?? 0,
    weight: n(item.weight) ?? 0,
    contribution: n(item.contribution) ?? 0,
    domainCode: String(item.domainCode ?? "D?"),
  }));
}

export function buildSummary(project: Project, latestEvaluation: Evaluation | null): SummaryMetricsViewModel {
  const inputs = getInputs(latestEvaluation);
  const totalCost = n(project.totalCost);
  const financingAmount = n(project.financingAmount);
  const equityAmount = totalCost !== null && financingAmount !== null ? Math.max(totalCost - financingAmount, 0) : null;
  const equityPct = n(inputs.equityPct) ?? (totalCost && equityAmount !== null ? (equityAmount / totalCost) * 100 : null);
  const alerts = extractAlerts(latestEvaluation);

  return {
    totalCost,
    financingAmount,
    equityAmount,
    equityPct,
    preSalesPct: n(inputs.preCommercialisationPct),
    progressPct: n(inputs.workProgressPct),
    dscr: n(inputs.dscr),
    finalScore: latestEvaluation ? n(latestEvaluation.finalScore) : null,
    alertsCount: alerts.length,
  };
}

function buildSponsor(inputs: Record<string, unknown>): SponsorViewModel {
  return {
    sponsorName: s(inputs.sponsorName) ?? "Promoteur principal",
    experienceScore: n(inputs.sponsorExperienceScore),
    trackRecordScore: n(inputs.sponsorTrackRecordScore),
    relationBankScore: n(inputs.relationBankScore),
    sponsorComment: s(inputs.sponsorComment),
  };
}

function buildFinancial(project: Project, inputs: Record<string, unknown>): FinancialViewModel {
  const totalCost = n(project.totalCost);
  const financingAmount = n(project.financingAmount);
  const equityAmount = totalCost !== null && financingAmount !== null ? Math.max(totalCost - financingAmount, 0) : null;
  return {
    totalCost,
    financingAmount,
    equityAmount,
    equityPct: n(inputs.equityPct) ?? (totalCost && equityAmount !== null ? (equityAmount / totalCost) * 100 : null),
    dscr: n(inputs.dscr),
    ratePct: n(inputs.ratePct),
    tenorMonths: n(inputs.tenorMonths),
    guaranteeCoveragePct: n(inputs.guaranteeCoveragePct),
  };
}

function buildCommercial(inputs: Record<string, unknown>): CommercialViewModel {
  return {
    preSalesPct: n(inputs.preCommercialisationPct),
    firmSalesAmount: n(inputs.firmSalesAmount),
    reservationsAmount: n(inputs.reservationsAmount),
    cancellationsCount: n(inputs.cancellationsCount),
    cancellationsAmount: n(inputs.cancellationsAmount),
    customerDepositsPct: n(inputs.customerDepositsPct),
    marketDemandScore: n(inputs.marketDemandScore),
    competitionPositionScore: n(inputs.competitionPositionScore),
  };
}

function buildConstruction(inputs: Record<string, unknown>): ConstructionViewModel {
  return {
    workProgressPct: n(inputs.workProgressPct),
    constructionDelayMonths: n(inputs.constructionDelayMonths),
    costOverrunPct: n(inputs.costOverrunPct),
    contractorQualityScore: n(inputs.contractorQualityScore),
    technicalIncidentLevel: s(inputs.technicalIncidentLevel),
  };
}

function buildGuarantees(inputs: Record<string, unknown>): GuaranteesViewModel {
  return {
    guaranteeCoveragePct: n(inputs.guaranteeCoveragePct),
    packageQualityScore: n(inputs.packageQualityScore),
    hardeningLevel: s(inputs.hardeningLevel),
  };
}

function buildBanking(inputs: Record<string, unknown>): BankingViewModel {
  return {
    relationshipYears: n(inputs.relationshipYears),
    bankingConductScore: n(inputs.bankingConductScore),
    centralizationPct: n(inputs.centralizationPct),
    incidentsCount: n(inputs.incidentsCount),
  };
}

function buildParameters(project: Project, latestEvaluation: Evaluation | null): ParametersViewModel {
  const results = ((latestEvaluation?.results ?? {}) as Record<string, unknown>);
  return {
    modelCode: latestEvaluation?.modelCode ?? "PI_2026Q1",
    segment: project.segment,
    zone: project.zone,
    alpha: n(results.alpha) ?? 0,
    beta: n(results.beta) ?? 0,
    methodologyNote: "Score économique par domaine, ajustement alpha/beta, puis malus D5.",
  };
}

function buildAnalyst(inputs: Record<string, unknown>): AnalystViewModel {
  const recommendation = s(inputs.analystRecommendation);
  return {
    recommendation,
    comments: s(inputs.analystComments),
    nextSteps: recommendation === "Défavorable"
      ? ["Revoir la structure financière", "Sécuriser les ventes fermes", "Repasser le dossier en comité"]
      : ["Confirmer les conditions suspensives", "Suivre la commercialisation", "Mettre à jour les alertes D5"],
  };
}

export function mapScoring(project: Project, latestEvaluation: Evaluation | null): ScoreSummaryViewModel {
  if (!latestEvaluation) {
    return {
      modelCode: "PI_2026Q1",
      finalScore: null,
      grade: null,
      status: "draft",
      scoreEco: 0,
      scoreAdjusted: 0,
      alpha: 0,
      beta: 0,
      malus: 0,
      domainScores: [
        { code: "D1", label: "Promoteur / Sponsor", score: 0, weight: 0.22 },
        { code: "D2", label: "Marché / Environnement", score: 0, weight: 0.18 },
        { code: "D3", label: "Structure & Commercialisation", score: 0, weight: 0.28 },
        { code: "D4", label: "Couverture financière", score: 0, weight: 0.22 },
        { code: "D5", label: "Alertes / Malus", score: 100, weight: 0.10 },
      ],
      kpiScores: [],
      alerts: [],
      date: null,
      riskLevel: "Non calculé",
    };
  }

  const results = (latestEvaluation.results ?? {}) as Record<string, unknown>;
  const finalScore = n(latestEvaluation.finalScore);
  const riskLevel = finalScore === null
    ? "Non calculé"
    : finalScore >= 80
      ? "Très favorable"
      : finalScore >= 65
        ? "Favorable"
        : finalScore >= 50
          ? "Sous surveillance"
          : "Tendu";

  return {
    modelCode: latestEvaluation.modelCode,
    finalScore,
    grade: latestEvaluation.grade,
    status: latestEvaluation.status,
    scoreEco: n(results.sEco) ?? 0,
    scoreAdjusted: n(results.sAdj) ?? 0,
    alpha: n(results.alpha) ?? 0,
    beta: n(results.beta) ?? 0,
    malus: n(results.malus) ?? 0,
    domainScores: extractDomainScores(results),
    kpiScores: extractKpis(results),
    alerts: extractAlerts(latestEvaluation),
    date: formatIso(latestEvaluation.createdAt),
    riskLevel,
  };
}

export function buildProjectShell(project: Project, evaluations: Evaluation[]): ProjectShellViewModel {
  const latestEvaluation = evaluations[0] ?? null;
  const inputs = getInputs(latestEvaluation);

  return {
    project: mapProject(project),
    summary: buildSummary(project, latestEvaluation),
    sponsor: buildSponsor(inputs),
    financial: buildFinancial(project, inputs),
    commercial: buildCommercial(inputs),
    construction: buildConstruction(inputs),
    guarantees: buildGuarantees(inputs),
    banking: buildBanking(inputs),
    parameters: buildParameters(project, latestEvaluation),
    analyst: buildAnalyst(inputs),
    scoring: mapScoring(project, latestEvaluation),
    history: mapHistory(evaluations),
  };
}
