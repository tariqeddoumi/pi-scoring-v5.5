import { PromoterDetail, PromoterRow, PromoterStats } from "./types";

const fmtDate = (value: Date | null | undefined) => (value ? value.toISOString() : null);
const fmtDecimal = (value: unknown) => (value == null ? null : Number(value));

export function mapPromoterRow(row: any): PromoterRow {
  return {
    id: row.id,
    promoterCode: row.promoterCode,
    legalName: row.legalName,
    tradeName: row.tradeName,
    dominantCity: row.dominantCity,
    dominantZone: row.dominantZone,
    dominantStanding: row.dominantStanding,
    isBankClient: row.isBankClient,
    watchlistFlag: row.watchlistFlag,
    restructuringFlag: row.restructuringFlag,
    litigationFlag: row.litigationFlag,
    completedProjectsCount: row.completedProjectsCount ?? row.completedProjects?.length ?? 0,
    ongoingProjectsCount: row.ongoingProjectsCount ?? row.ongoingProjects?.length ?? 0,
    specialization: row.specialization,
    promoterType: row.promoterType,
    updatedAt: row.updatedAt.toISOString(),
  };
}

export function mapPromoterDetail(row: any): PromoterDetail {
  return {
    ...mapPromoterRow(row),
    groupName: row.groupName,
    ice: row.ice,
    rc: row.rc,
    legalForm: row.legalForm,
    creationDate: fmtDate(row.creationDate),
    piExperienceYears: row.piExperienceYears,
    bankRelationshipYears: row.bankRelationshipYears,
    headOfficeAddress: row.headOfficeAddress,
    phone: row.phone,
    email: row.email,
    website: row.website,
    mainContactName: row.mainContactName,
    mainContactRole: row.mainContactRole,
    analystComment: row.analystComment,
    shareholders: (row.shareholders ?? []).map((s: any) => ({
      id: s.id,
      shareholderName: s.shareholderName,
      shareholderType: s.shareholderType,
      ownershipPct: fmtDecimal(s.ownershipPct),
      nationality: s.nationality,
      isBankClient: s.isBankClient,
      bankRelationshipStatus: s.bankRelationshipStatus,
      incidentFlag: s.incidentFlag,
      watchlistFlag: s.watchlistFlag,
      litigationFlag: s.litigationFlag,
      comment: s.comment,
    })),
    completedProjects: (row.completedProjects ?? []).map((p: any) => ({
      id: p.id,
      projectName: p.projectName,
      city: p.city,
      zone: p.zone,
      standing: p.standing,
      projectType: p.projectType,
      unitsCount: p.unitsCount,
      financedByOurBank: p.financedByOurBank,
      financingBankName: p.financingBankName,
      deliveryYear: p.deliveryYear,
      outcomeStatus: p.outcomeStatus,
      watchlistFlag: p.watchlistFlag,
      incidentFlag: p.incidentFlag,
      restructuringFlag: p.restructuringFlag,
      litigationFlag: p.litigationFlag,
      comment: p.comment,
    })),
    ongoingProjects: (row.ongoingProjects ?? []).map((p: any) => ({
      id: p.id,
      projectName: p.projectName,
      city: p.city,
      zone: p.zone,
      standing: p.standing,
      projectType: p.projectType,
      workProgressPct: fmtDecimal(p.workProgressPct),
      precommercialisationPct: fmtDecimal(p.precommercialisationPct),
      financedByOurBank: p.financedByOurBank,
      financingBankName: p.financingBankName,
      situationStatus: p.situationStatus,
      watchlistFlag: p.watchlistFlag,
      incidentFlag: p.incidentFlag,
      comment: p.comment,
    })),
    bankEvents: (row.bankEvents ?? []).map((e: any) => ({
      id: e.id,
      eventDate: e.eventDate.toISOString(),
      eventType: e.eventType,
      severity: e.severity,
      resolvedFlag: e.resolvedFlag,
      comment: e.comment,
    })),
  };
}

export function computePromoterStats(rows: PromoterRow[]): PromoterStats {
  return {
    totalPromoters: rows.length,
    bankClients: rows.filter((r) => r.isBankClient).length,
    watchlisted: rows.filter((r) => r.watchlistFlag).length,
    withIncidents: rows.filter((r) => r.restructuringFlag || r.litigationFlag).length,
    referencedProjects: rows.reduce((acc, row) => acc + row.completedProjectsCount + row.ongoingProjectsCount, 0),
  };
}
