import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "PI Scoring Premium",
  description: "Scoring Promotion Immobilière — interface premium web",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="pi-app-shell">
          <header className="pi-navbar">
            <div className="pi-navbar-inner">
              <Link href="/" className="pi-brand">PI Scoring Premium</Link>
              <nav className="pi-nav-links">
                <Link href="/projects">Projets</Link>
                <Link href="/evaluations">Évaluations</Link>
                <Link href="/promoters">Promoteurs</Link>
                <Link href="/projects-premium/sample">Signalétique Projet</Link>
                <Link href="/login">Connexion</Link>
              </nav>
            </div>
          </header>
          <main className="pi-root-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
