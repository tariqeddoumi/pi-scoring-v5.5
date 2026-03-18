export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const body = await req.json();

  const promoter = await prisma.promoter.update({
    where: { id },
    data: {
      promoterCode: body.promoterCode,
      legalName: body.legalName,
      tradeName: body.tradeName || null,
      ice: body.ice || null,
      rc: body.rc || null,
      legalForm: body.legalForm || null,
      groupName: body.groupName || null,
      promoterType: body.promoterType || null,
      specialization: body.specialization || null,
      dominantCity: body.dominantCity || null,
      dominantZone: body.dominantZone || null,
      dominantStanding: body.dominantStanding || null,
      piExperienceYears: body.piExperienceYears ? Number(body.piExperienceYears) : null,
      isBankClient: Boolean(body.isBankClient),
      bankRelationshipYears: body.bankRelationshipYears ? Number(body.bankRelationshipYears) : null,
      watchlistFlag: Boolean(body.watchlistFlag),
      restructuringFlag: Boolean(body.restructuringFlag),
      litigationFlag: Boolean(body.litigationFlag),
      mainContactName: body.mainContactName || null,
      mainContactRole: body.mainContactRole || null,
      analystComment: body.analystComment || null,
    },
  });

  return NextResponse.json(promoter);
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  await prisma.promoter.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
