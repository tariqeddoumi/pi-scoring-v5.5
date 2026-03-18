type LoadedModel = {
  modelVersion: { code: string } | null;
  domainWeights: Array<{ domainCode: string; weight: unknown }>;
  thresholds: Array<{
    kpiCode: string;
    segment: string | null;
    zone: string | null;
    bandMin: unknown;
    bandMax: unknown;
    score: unknown;
  }>;
  segmentAdjustments: Array<{ segment: string; alpha: unknown }>;
  zoneAdjustments: Array<{ zone: string; beta: unknown }>;
  d5Triggers: Array<{ triggerCode: string; label: string; severity: string; malus: unknown }>;
};

export type ScoringInputs = {
  segment: string;
  zone: string;
  sponsorName?: string;
  sponsorExperienceScore: number;
  sponsorTrackRecordScore: number;
  relationBankScore: number;
  sponsorComment?: string;
  marketDemandScore: number;
  competitionPositionScore: number;
  preCommercialisationPct: number;
  firmSalesAmount: number;
  reservationsAmount: number;
  cancellationsCount: number;
  cancellationsAmount: number;
  customerDepositsPct: number;
  workProgressPct: number;
  constructionDelayMonths: number;
  costOverrunPct: number;
  contractorQualityScore: number;
  technicalIncidentLevel?: string;
  equityPct: number;
  dscr: number;
  ratePct: number;
  tenorMonths: number;
  guaranteeCoveragePct: number;
  packageQualityScore: number;
  hardeningLevel?: string;
  relationshipYears: number;
  bankingConductScore: number;
  centralizationPct: number;
  incidentsCount: number;
  analystRecommendation?: string;
  analystComments?: string;
  d5Triggers: string[];
};

export type KpiResult = {
  code: string;
  label: string;
  value: number | string;
  score: number;
  weight: number;
  contribution: number;
  domainCode: string;
};

export type DomainResult = {
  code: string;
  label: string;
  score: number;
  weight: number;
};

export type AlertResult = {
  code: string;
  label: string;
  severity: string;
  malus: number;
  source: string;
};

export type ScoringOutput = {
  modelCode: string;
  domainResults: DomainResult[];
  kpiResults: KpiResult[];
  alerts: AlertResult[];
  alpha: number;
  beta: number;
  sEco: number;
  sAdj: number;
  malus: number;
  finalScore: number;
  grade: string;
};

function toNumber(value: unknown): number {
  if (value === null || value === undefined || value === "") return 0;
  const out = Number(value);
  return Number.isFinite(out) ? out : 0;
}

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function avg(values: number[]) {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function thresholdScore(
  thresholds: LoadedModel["thresholds"],
  kpiCode: string,
  value: number,
  segment?: string,
  zone?: string,
): number | null {
  const filtered = thresholds.filter((t) => {
    if (t.kpiCode !== kpiCode) return false;
    if (t.segment && segment && t.segment !== segment) return false;
    if (t.zone && zone && t.zone !== zone) return false;
    return true;
  });

  for (const t of filtered) {
    const min = t.bandMin === null ? -Infinity : toNumber(t.bandMin);
    const max = t.bandMax === null ? Infinity : toNumber(t.bandMax);
    if (value >= min && value < max) return clamp(toNumber(t.score));
  }
  return null;
}

function inverseBand(value: number, excellent: number, acceptable: number, critical: number) {
  if (value <= excellent) return 90;
  if (value <= acceptable) return 65;
  if (value <= critical) return 35;
  return 10;
}

function positiveBand(value: number, weak: number, acceptable: number, good: number) {
  if (value >= good) return 90;
  if (value >= acceptable) return 65;
  if (value >= weak) return 35;
  return 10;
}

function amountBand(value: number, weak: number, acceptable: number, good: number) {
  if (value >= good) return 85;
  if (value >= acceptable) return 65;
  if (value >= weak) return 40;
  return 15;
}

function d5AutoAlerts(inputs: ScoringInputs): AlertResult[] {
  const alerts: AlertResult[] = [];
  if (inputs.constructionDelayMonths >= 6) {
    alerts.push({
      code: 'AUTO_DELAY',
      label: 'Retard chantier supérieur à 6 mois',
      severity: inputs.constructionDelayMonths >= 12 ? 'critique' : 'vigilance',
      malus: inputs.constructionDelayMonths >= 12 ? 10 : 5,
      source: 'constructionDelayMonths',
    });
  }
  if (inputs.costOverrunPct >= 10) {
    alerts.push({
      code: 'AUTO_OVERRUN',
      label: 'Dérive coût significative',
      severity: inputs.costOverrunPct >= 20 ? 'critique' : 'vigilance',
      malus: inputs.costOverrunPct >= 20 ? 10 : 4,
      source: 'costOverrunPct',
    });
  }
  if (inputs.incidentsCount >= 3) {
    alerts.push({
      code: 'AUTO_INCIDENTS',
      label: 'Incidents bancaires récurrents',
      severity: 'critique',
      malus: 8,
      source: 'incidentsCount',
    });
  }
  if (inputs.dscr > 0 && inputs.dscr < 1) {
    alerts.push({
      code: 'AUTO_DSCR',
      label: 'DSCR inférieur à 1,0',
      severity: 'hard',
      malus: 18,
      source: 'dscr',
    });
  }
  return alerts;
}

export function computeScoring({ model, inputs }: { model: LoadedModel; inputs: ScoringInputs }): ScoringOutput {
  const weights: Record<string, number> = {
    D1: toNumber(model.domainWeights.find((d) => d.domainCode === 'D1')?.weight) || 0.22,
    D2: toNumber(model.domainWeights.find((d) => d.domainCode === 'D2')?.weight) || 0.18,
    D3: toNumber(model.domainWeights.find((d) => d.domainCode === 'D3')?.weight) || 0.28,
    D4: toNumber(model.domainWeights.find((d) => d.domainCode === 'D4')?.weight) || 0.22,
    D5: toNumber(model.domainWeights.find((d) => d.domainCode === 'D5')?.weight) || 0.10,
  };

  const kpiResults: KpiResult[] = [];
  const pushKpi = (domainCode: string, code: string, label: string, value: number | string, score: number, weight: number) => {
    kpiResults.push({ code, label, value, score, weight, contribution: score * weight, domainCode });
  };

  const preSalesScore = thresholdScore(model.thresholds, 'D3.1.1', inputs.preCommercialisationPct, inputs.segment, inputs.zone) ?? positiveBand(inputs.preCommercialisationPct, 20, 45, 65);
  const workProgressScore = thresholdScore(model.thresholds, 'D3.2.1', inputs.workProgressPct, inputs.segment, inputs.zone) ?? positiveBand(inputs.workProgressPct, 25, 50, 75);
  const dscrScore = thresholdScore(model.thresholds, 'D4.1.1', inputs.dscr, inputs.segment, inputs.zone) ?? positiveBand(inputs.dscr, 1.0, 1.15, 1.3);

  const sponsorExperience = clamp(inputs.sponsorExperienceScore || 0);
  const trackRecord = clamp(inputs.sponsorTrackRecordScore || 0);
  const relationBank = clamp(inputs.relationBankScore || 0);
  pushKpi('D1', 'D1.1.1', 'Expérience promoteur', sponsorExperience, sponsorExperience, 0.35);
  pushKpi('D1', 'D1.1.2', 'Track record', trackRecord, trackRecord, 0.40);
  pushKpi('D1', 'D1.1.3', 'Relation banque', relationBank, relationBank, 0.25);
  const d1Score = avg([sponsorExperience, trackRecord, relationBank]);

  const marketDemand = clamp(inputs.marketDemandScore || 0);
  const competitionPosition = clamp(inputs.competitionPositionScore || 0);
  const zoneAttractiveness = inputs.zone.toLowerCase().includes('a') ? 80 : inputs.zone ? 60 : 45;
  pushKpi('D2', 'D2.1.1', 'Demande marché', marketDemand, marketDemand, 0.4);
  pushKpi('D2', 'D2.1.2', 'Position concurrentielle', competitionPosition, competitionPosition, 0.35);
  pushKpi('D2', 'D2.1.3', 'Attractivité zone', zoneAttractiveness, zoneAttractiveness, 0.25);
  const d2Score = avg([marketDemand, competitionPosition, zoneAttractiveness]);

  const firmSalesScore = amountBand(inputs.firmSalesAmount, 500000, 2000000, 5000000);
  const reservationsScore = amountBand(inputs.reservationsAmount, 250000, 1000000, 2500000);
  const cancellationsScore = inverseBand(inputs.cancellationsCount, 0, 2, 5);
  const depositsScore = positiveBand(inputs.customerDepositsPct, 5, 12, 20);
  const delayScore = inverseBand(inputs.constructionDelayMonths, 0, 3, 6);
  const overrunScore = inverseBand(inputs.costOverrunPct, 0, 5, 10);
  const contractorQuality = clamp(inputs.contractorQualityScore || 0);
  pushKpi('D3', 'D3.1.1', 'Précommercialisation', inputs.preCommercialisationPct, preSalesScore, 0.20);
  pushKpi('D3', 'D3.1.2', 'Ventes fermes', inputs.firmSalesAmount, firmSalesScore, 0.10);
  pushKpi('D3', 'D3.1.3', 'Réservations', inputs.reservationsAmount, reservationsScore, 0.10);
  pushKpi('D3', 'D3.1.4', 'Désistements', inputs.cancellationsCount, cancellationsScore, 0.10);
  pushKpi('D3', 'D3.1.5', 'Dépôts clients', inputs.customerDepositsPct, depositsScore, 0.10);
  pushKpi('D3', 'D3.2.1', 'Avancement travaux', inputs.workProgressPct, workProgressScore, 0.20);
  pushKpi('D3', 'D3.2.2', 'Retard chantier', inputs.constructionDelayMonths, delayScore, 0.10);
  pushKpi('D3', 'D3.2.3', 'Dérive coût', inputs.costOverrunPct, overrunScore, 0.05);
  pushKpi('D3', 'D3.2.4', 'Qualité entreprise', contractorQuality, contractorQuality, 0.05);
  const d3Score = avg([preSalesScore, firmSalesScore, reservationsScore, cancellationsScore, depositsScore, workProgressScore, delayScore, overrunScore, contractorQuality]);

  const equityScore = positiveBand(inputs.equityPct, 10, 20, 30);
  const guaranteeScore = positiveBand(inputs.guaranteeCoveragePct, 50, 80, 110);
  const bankingScore = clamp(inputs.bankingConductScore || 0);
  const centralizationScore = positiveBand(inputs.centralizationPct, 40, 70, 90);
  pushKpi('D4', 'D4.1.1', 'DSCR', inputs.dscr, dscrScore, 0.35);
  pushKpi('D4', 'D4.1.2', 'Fonds propres %', inputs.equityPct, equityScore, 0.25);
  pushKpi('D4', 'D4.1.3', 'Couverture garanties', inputs.guaranteeCoveragePct, guaranteeScore, 0.15);
  pushKpi('D4', 'D4.1.4', 'Comportement bancaire', bankingScore, bankingScore, 0.15);
  pushKpi('D4', 'D4.1.5', 'Centralisation flux', inputs.centralizationPct, centralizationScore, 0.10);
  const d4Score = avg([dscrScore, equityScore, guaranteeScore, bankingScore, centralizationScore]);

  const alerts: AlertResult[] = [];
  const manualAlerts = model.d5Triggers
    .filter((t) => inputs.d5Triggers.includes(t.triggerCode))
    .map((t) => ({ code: t.triggerCode, label: t.label, severity: t.severity, malus: toNumber(t.malus), source: 'manual' }));
  alerts.push(...manualAlerts, ...d5AutoAlerts(inputs));

  const d5Penalty = alerts.reduce((sum, item) => sum + item.malus, 0);
  const d5Score = Math.max(0, 100 - d5Penalty);

  const domainResults: DomainResult[] = [
    { code: 'D1', label: 'Promoteur / Sponsor', score: clamp(d1Score), weight: weights.D1 },
    { code: 'D2', label: 'Marché / Environnement', score: clamp(d2Score), weight: weights.D2 },
    { code: 'D3', label: 'Structure & Commercialisation', score: clamp(d3Score), weight: weights.D3 },
    { code: 'D4', label: 'Couverture financière', score: clamp(d4Score), weight: weights.D4 },
    { code: 'D5', label: 'Alertes / Malus', score: clamp(d5Score), weight: weights.D5 },
  ];

  const sEco = domainResults
    .filter((domain) => domain.code !== 'D5')
    .reduce((sum, domain) => sum + domain.score * domain.weight, 0);

  const alpha = toNumber(model.segmentAdjustments.find((s) => s.segment === inputs.segment)?.alpha);
  const beta = toNumber(model.zoneAdjustments.find((z) => z.zone === inputs.zone)?.beta);
  const sAdj = sEco * (1 + alpha + beta);
  const finalScore = clamp(sAdj - d5Penalty);

  let grade = 'D';
  if (finalScore >= 80) grade = 'A';
  else if (finalScore >= 65) grade = 'B';
  else if (finalScore >= 50) grade = 'C';

  return {
    modelCode: model.modelVersion?.code ?? 'PI_2026Q1',
    domainResults,
    kpiResults,
    alerts,
    alpha,
    beta,
    sEco,
    sAdj,
    malus: d5Penalty,
    finalScore,
    grade,
  };
}
