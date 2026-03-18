export type HistoryItemViewModel = {
  id: string;
  date: string;
  modelCode: string;
  finalScore: number | null;
  grade: string | null;
  status: string;
};

export type ProjectViewModel = {
  id: string;
  name: string;
  projectCode: string | null;
  city: string | null;
  zone: string | null;
  segment: string | null;
  type: string | null;
  currency: string | null;
  totalCost: number | null;
  financingAmount: number | null;
  createdAt: string;
  updatedAt: string;
};

export type SummaryMetricsViewModel = {
  totalCost: number | null;
  financingAmount: number | null;
  equityAmount: number | null;
  equityPct: number | null;
  preSalesPct: number | null;
  progressPct: number | null;
  dscr: number | null;
  finalScore: number | null;
  alertsCount: number;
};

export type DomainScoreViewModel = {
  code: string;
  label: string;
  score: number;
  weight: number;
};

export type KpiScoreViewModel = {
  code: string;
  label: string;
  value: number | string | null;
  score: number;
  weight: number;
  contribution: number;
  domainCode: string;
};

export type AlertViewModel = {
  code: string;
  label: string;
  severity: string;
  malus: number;
  source?: string;
};

export type SponsorViewModel = {
  sponsorName: string;
  experienceScore: number | null;
  trackRecordScore: number | null;
  relationBankScore: number | null;
  sponsorComment: string | null;
};

export type FinancialViewModel = {
  totalCost: number | null;
  financingAmount: number | null;
  equityAmount: number | null;
  equityPct: number | null;
  dscr: number | null;
  ratePct: number | null;
  tenorMonths: number | null;
  guaranteeCoveragePct: number | null;
};

export type CommercialViewModel = {
  preSalesPct: number | null;
  firmSalesAmount: number | null;
  reservationsAmount: number | null;
  cancellationsCount: number | null;
  cancellationsAmount: number | null;
  customerDepositsPct: number | null;
  marketDemandScore: number | null;
  competitionPositionScore: number | null;
};

export type ConstructionViewModel = {
  workProgressPct: number | null;
  constructionDelayMonths: number | null;
  costOverrunPct: number | null;
  contractorQualityScore: number | null;
  technicalIncidentLevel: string | null;
};

export type GuaranteesViewModel = {
  guaranteeCoveragePct: number | null;
  packageQualityScore: number | null;
  hardeningLevel: string | null;
};

export type BankingViewModel = {
  relationshipYears: number | null;
  bankingConductScore: number | null;
  centralizationPct: number | null;
  incidentsCount: number | null;
};

export type ParametersViewModel = {
  modelCode: string;
  segment: string | null;
  zone: string | null;
  alpha: number;
  beta: number;
  methodologyNote: string;
};

export type AnalystViewModel = {
  recommendation: string | null;
  comments: string | null;
  nextSteps: string[];
};

export type ScoreSummaryViewModel = {
  modelCode: string;
  finalScore: number | null;
  grade: string | null;
  status: string;
  scoreEco: number;
  scoreAdjusted: number;
  alpha: number;
  beta: number;
  malus: number;
  domainScores: DomainScoreViewModel[];
  kpiScores: KpiScoreViewModel[];
  alerts: AlertViewModel[];
  date: string | null;
  riskLevel: string;
};

export type ProjectShellViewModel = {
  project: ProjectViewModel;
  summary: SummaryMetricsViewModel;
  sponsor: SponsorViewModel;
  financial: FinancialViewModel;
  commercial: CommercialViewModel;
  construction: ConstructionViewModel;
  guarantees: GuaranteesViewModel;
  banking: BankingViewModel;
  parameters: ParametersViewModel;
  analyst: AnalystViewModel;
  scoring: ScoreSummaryViewModel;
  history: HistoryItemViewModel[];
};
