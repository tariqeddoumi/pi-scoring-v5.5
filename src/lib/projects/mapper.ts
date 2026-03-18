
import { ProjectPremiumPageVM } from './types';

const toNum = (value: unknown): number | null => {
  if (value === null || value === undefined) return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
};

export function buildProjectPremiumView(project: any): ProjectPremiumPageVM {
  return {
    project: {
      id: project.id,
      projectCode: project.projectCode ?? null,
      name: project.name,
      projectTradeName: project.projectTradeName ?? null,
      city: project.city ?? null,
      zone: project.zone ?? null,
      subZone: project.subZone ?? null,
      address: project.address ?? null,
      country: project.country ?? null,
      region: project.region ?? null,
      district: project.district ?? null,
      latitude: toNum(project.latitude),
      longitude: toNum(project.longitude),
      segment: project.segment ?? null,
      type: project.type ?? null,
      promotionMode: project.promotionMode ?? null,
      dominantTypology: project.dominantTypology ?? null,
      targetClientele: project.targetClientele ?? null,
      projectStatus: project.projectStatus ?? null,
      fileType: project.fileType ?? null,
      landArea: toNum(project.landArea),
      builtArea: toNum(project.builtArea),
      saleableArea: toNum(project.saleableArea),
      unitsCount: project.unitsCount ?? null,
      blocksCount: project.blocksCount ?? null,
      parkingCount: project.parkingCount ?? null,
      promoter: project.promoter ? {
        id: project.promoter.id,
        legalName: project.promoter.legalName,
        tradeName: project.promoter.tradeName ?? null,
      } : null,
      summary: project.projectSummary ?? null,
      analystComment: project.analystComment ?? null,
    },
    scopes: (project.financedScopes ?? []).map((s: any) => ({
      id: s.id,
      scopeType: s.scopeType,
      scopeCode: s.scopeCode ?? null,
      scopeLabel: s.scopeLabel,
      scopeProjectType: s.scopeProjectType ?? null,
      scopeUnitsCount: s.scopeUnitsCount ?? null,
      scopeArea: toNum(s.scopeArea),
      scopeCost: toNum(s.scopeCost),
      scopeRevenue: toNum(s.scopeRevenue),
      scopeFinancingAmount: toNum(s.scopeFinancingAmount),
      scopeEquityAmount: toNum(s.scopeEquityAmount),
      scopeProgressPct: toNum(s.scopeProgressPct),
      scopeLegalStatus: s.scopeLegalStatus ?? null,
      scopeShareOfProjectPct: toNum(s.scopeShareOfProjectPct),
      scopeComment: s.scopeComment ?? null,
    })),
    marketRefs: (project.marketRefs ?? []).map((r: any) => ({
      id: r.id,
      refProjectName: r.refProjectName,
      refPromoterName: r.refPromoterName ?? null,
      refCity: r.refCity ?? null,
      refZone: r.refZone ?? null,
      refStanding: r.refStanding ?? null,
      refProjectType: r.refProjectType ?? null,
      refPriceMin: toNum(r.refPriceMin),
      refPriceMax: toNum(r.refPriceMax),
      refFinancedByBank: r.refFinancedByBank ?? null,
      refFinancedByOurBank: r.refFinancedByOurBank ?? null,
      refSuccessFlag: r.refSuccessFlag ?? null,
      refWatchlistFlag: r.refWatchlistFlag ?? null,
      refIssueStatus: r.refIssueStatus ?? null,
      refComment: r.refComment ?? null,
    })),
    locationPoints: (project.locationPoints ?? []).map((p: any) => ({
      id: p.id,
      pointType: p.pointType,
      label: p.label,
      city: p.city ?? null,
      zone: p.zone ?? null,
      latitude: toNum(p.latitude),
      longitude: toNum(p.longitude),
      standing: p.standing ?? null,
      issueStatus: p.issueStatus ?? null,
    })),
  };
}
