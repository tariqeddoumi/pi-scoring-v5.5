
export type ProjectPremiumVM = {
  id: string;
  projectCode?: string | null;
  name: string;
  projectTradeName?: string | null;
  city?: string | null;
  zone?: string | null;
  subZone?: string | null;
  address?: string | null;
  country?: string | null;
  region?: string | null;
  district?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  segment?: string | null;
  type?: string | null;
  promotionMode?: string | null;
  dominantTypology?: string | null;
  targetClientele?: string | null;
  projectStatus?: string | null;
  fileType?: string | null;
  landArea?: number | null;
  builtArea?: number | null;
  saleableArea?: number | null;
  unitsCount?: number | null;
  blocksCount?: number | null;
  parkingCount?: number | null;
  promoter?: { id: string; legalName: string; tradeName?: string | null } | null;
  summary?: string | null;
  analystComment?: string | null;
};

export type FinancedScopeVM = {
  id: string;
  scopeType: string;
  scopeCode?: string | null;
  scopeLabel: string;
  scopeProjectType?: string | null;
  scopeUnitsCount?: number | null;
  scopeArea?: number | null;
  scopeCost?: number | null;
  scopeRevenue?: number | null;
  scopeFinancingAmount?: number | null;
  scopeEquityAmount?: number | null;
  scopeProgressPct?: number | null;
  scopeLegalStatus?: string | null;
  scopeShareOfProjectPct?: number | null;
  scopeComment?: string | null;
};

export type MarketRefVM = {
  id: string;
  refProjectName: string;
  refPromoterName?: string | null;
  refCity?: string | null;
  refZone?: string | null;
  refStanding?: string | null;
  refProjectType?: string | null;
  refPriceMin?: number | null;
  refPriceMax?: number | null;
  refFinancedByBank?: boolean | null;
  refFinancedByOurBank?: boolean | null;
  refSuccessFlag?: boolean | null;
  refWatchlistFlag?: boolean | null;
  refIssueStatus?: string | null;
  refComment?: string | null;
};

export type LocationPointVM = {
  id: string;
  pointType: string;
  label: string;
  city?: string | null;
  zone?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  standing?: string | null;
  issueStatus?: string | null;
};

export type ProjectPremiumPageVM = {
  project: ProjectPremiumVM;
  scopes: FinancedScopeVM[];
  marketRefs: MarketRefVM[];
  locationPoints: LocationPointVM[];
};
