import Link from "next/link";

export default function Home() {
  return (
    <div className="pi-home-hero">
      <div className="pi-home-copy">
        <span className="pi-eyebrow">Promotion immobilière • Risk Management</span>
        <h1>Plateforme premium de scoring PI</h1>
        <p>
          Une interface unique pour suivre le dossier, lire les KPI structurants,
          lancer le scoring D1 à D5 et analyser les red flags D5 dans une présentation haut de gamme.
        </p>
        <div className="pi-home-actions">
          <Link href="/projects" className="pi-primary-btn">Gérer les projets</Link>
          <Link href="/evaluations" className="pi-secondary-btn">Voir les évaluations</Link>
          <Link href="/promoters" className="pi-secondary-btn">Référentiel promoteurs</Link>
        </div>
      </div>
      <div className="pi-home-panel">
        <h2>Contenu de la V2 incrémentale</h2>
        <ul>
          <li>Page dossier unique premium avec accordéons</li>
          <li>Panneau sticky de scoring en temps réel</li>
          <li>Lecture détaillée des domaines D1 à D5</li>
          <li>Historique des évaluations et red flags D5</li>
        </ul>
      </div>
    </div>
  );
}
