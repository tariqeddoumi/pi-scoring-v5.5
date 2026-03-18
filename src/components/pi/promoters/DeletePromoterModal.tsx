"use client";

import { PromoterDetail } from "@/lib/promoters/types";

type Props = { promoter?: PromoterDetail | null; open: boolean; onClose: () => void };

export default function DeletePromoterModal({ promoter, open, onClose }: Props) {
  if (!open || !promoter) return null;

  async function confirmDelete() {
    try {
      const res = await fetch(`/api/promoters/${promoter.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Suppression impossible");
      window.location.reload();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erreur de suppression");
    }
  }

  return (
    <div className="pi-modal-overlay">
      <div className="pi-modal pi-modal-sm">
        <div className="pi-modal-header">
          <h2>Supprimer le promoteur</h2>
          <button onClick={onClose}>✕</button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Vous allez supprimer <strong>{promoter.legalName}</strong> ainsi que ses actionnaires, projets liés et événements bancaires.
        </p>
        <div className="pi-modal-actions">
          <button className="pi-secondary-btn" onClick={onClose}>Annuler</button>
          <button className="pi-danger-btn" onClick={confirmDelete}>Supprimer définitivement</button>
        </div>
      </div>
    </div>
  );
}
