export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db/prisma";
import { computePromoterStats, mapPromoterDetail, mapPromoterRow } from "@/lib/promoters/mapper";
import PromoterModuleShell from "@/components/pi/promoters/PromoterModuleShell";

export default async function PromotersPage() {
  try {
    const rows = await prisma.promoter.findMany({
      include: {
        shareholders: true,
        completedProjects: true,
        ongoingProjects: true,
        bankEvents: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    const promoterRows = rows.map(mapPromoterRow);
    const details = rows.map(mapPromoterDetail);
    const stats = computePromoterStats(promoterRows);

    return <PromoterModuleShell promoters={promoterRows} details={details} stats={stats} />;
  } catch (error) {
    console.error("Promoters page error:", error);
    return (
      <main className="p-6">
        <div className="pi-card">
          <h1 className="text-2xl font-bold mb-2">Référentiel Promoteurs</h1>
          <p className="text-sm text-gray-600 mb-4">
            Le module Promoteur V5.1 est prêt côté interface, mais les tables promoteur ne semblent pas encore créées.
          </p>
          <p className="text-sm text-red-600">
            Exécute d&apos;abord les scripts <code>sql/04_promoters_v5_1.sql</code> puis <code>sql/05_promoters_seed_demo.sql</code>, ensuite relance la page.
          </p>
        </div>
      </main>
    );
  }
}
