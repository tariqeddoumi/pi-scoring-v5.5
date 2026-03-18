export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { buildProjectShell } from "@/lib/pi/mapper";
import { ProjectScoringShell } from "@/components/pi/shell/ProjectScoringShell";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      evaluations: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!project) notFound();

  const shellData = buildProjectShell(project, project.evaluations);

  return (
    <main className="pi-page-container">
      <div className="pi-top-actions">
        <Link href="/projects" className="pi-text-link">← Retour aux projets</Link>
        <Link href={`/projects/${project.id}/evaluate`} className="pi-primary-btn">Nouvelle évaluation</Link>
      </div>

      <ProjectScoringShell data={shellData} />
    </main>
  );
}
