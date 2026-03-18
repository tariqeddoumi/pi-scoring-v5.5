export type PromoterRow = {
  id: string;
  promoterCode: string;
  legalName: string;
  tradeName?: string | null;
  dominantCity?: string | null;
  dominantZone?: string | null;
  dominantStanding?: string | null;
  isBankClient: boolean;
  watchlistFlag: boolean;
  restructuringFlag: boolean;
  litigationFlag: boolean;
  completedProjectsCount: number;
  ongoingProjectsCount: number;
  specialization?: string | null;
  promoterType?: string | null;
  updatedAt: string;
};

export type PromoterDetail = PromoterRow & {
  groupName?: string | null;
  ice?: string | null;
  rc?: string | null;
  legalForm?: string | null;
  creationDate?: string | null;
  piExperienceYears?: number | null;
  bankRelationshipYears?: number | null;
  headOfficeAddress?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  mainContactName?: string | null;
  mainContactRole?: string | null;
  analystComment?: string | null;
  shareholders: Array<{
    id: string;
    shareholderName: string;
    shareholderType?: string | null;
    ownershipPct?: number | null;
    nationality?: string | null;
    isBankClient: boolean;
    bankRelationshipStatus?: string | null;
    incidentFlag: boolean;
    watchlistFlag: boolean;
    litigationFlag: boolean;
    comment?: string | null;
  }>;
  completedProjects: Array<{
    id: string;
    projectName: string;
    city?: string | null;
    zone?: string | null;
    standing?: string | null;
    projectType?: string | null;
    unitsCount?: number | null;
    financedByOurBank: boolean;
    financingBankName?: string | null;
    deliveryYear?: number | null;
    outcomeStatus?: string | null;
    watchlistFlag: boolean;
    incidentFlag: boolean;
    restructuringFlag: boolean;
    litigationFlag: boolean;
    comment?: string | null;
  }>;
  ongoingProjects: Array<{
    id: string;
    projectName: string;
    city?: string | null;
    zone?: string | null;
    standing?: string | null;
    projectType?: string | null;
    workProgressPct?: number | null;
    precommercialisationPct?: number | null;
    financedByOurBank: boolean;
    financingBankName?: string | null;
    situationStatus?: string | null;
    watchlistFlag: boolean;
    incidentFlag: boolean;
    comment?: string | null;
  }>;
  bankEvents: Array<{
    id: string;
    eventDate: string;
    eventType: string;
    severity?: string | null;
    resolvedFlag: boolean;
    comment?: string | null;
  }>;
};

export type PromoterStats = {
  totalPromoters: number;
  bankClients: number;
  watchlisted: number;
  withIncidents: number;
  referencedProjects: number;
};
