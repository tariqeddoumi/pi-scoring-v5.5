
export const dynamic = "force-dynamic";

import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { buildProjectPremiumView } from '@/lib/projects/mapper';
import ProjectSignaleticShell from '@/components/pi/projects/ProjectSignaleticShell';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectPremiumPage({ params }: PageProps) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      promoter: true,
      financedScopes: true,
      marketRefs: true,
      locationPoints: true,
    },
  });

  if (!project) notFound();

  const data = buildProjectPremiumView(project);
  return <ProjectSignaleticShell data={data} />;
}
