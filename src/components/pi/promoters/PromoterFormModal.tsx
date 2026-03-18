"use client";

import { useEffect, useState } from "react";
import { PromoterDetail } from "@/lib/promoters/types";

type Props = {
  open: boolean;
  mode: "create" | "edit";
  promoter?: PromoterDetail | null;
  onClose: () => void;
};

const emptyForm = {
  promoterCode: "",
  legalName: "",
  tradeName: "",
  ice: "",
  rc: "",
  legalForm: "",
  groupName: "",
  promoterType: "",
  specialization: "",
  dominantCity: "",
  dominantZone: "",
  dominantStanding: "",
  piExperienceYears: "",
  isBankClient: false,
  bankRelationshipYears: "",
  watchlistFlag: false,
  restructuringFlag: false,
  litigationFlag: false,
  mainContactName: "",
  mainContactRole: "",
  analystComment: "",
};

export default function PromoterFormModal({ open, mode, promoter, onClose }: Props) {
  const [form, setForm] = useState<any>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (mode === "edit" && promoter) {
      setForm({
        promoterCode: promoter.promoterCode,
        legalName: promoter.legalName,
        tradeName: promoter.tradeName ?? "",
        ice: promoter.ice ?? "",
        rc: promoter.rc ?? "",
        legalForm: promoter.legalForm ?? "",
        groupName: promoter.groupName ?? "",
        promoterType: promoter.promoterType ?? "",
        specialization: promoter.specialization ?? "",
        dominantCity: promoter.dominantCity ?? "",
        dominantZone: promoter.dominantZone ?? "",
        dominantStanding: promoter.dominantStanding ?? "",
        piExperienceYears: promoter.piExperienceYears ?? "",
        isBankClient: promoter.isBankClient,
        bankRelationshipYears: promoter.bankRelationshipYears ?? "",
        watchlistFlag: promoter.watchlistFlag,
        restructuringFlag: promoter.restructuringFlag,
        litigationFlag: promoter.litigationFlag,
        mainContactName: promoter.mainContactName ?? "",
        mainContactRole: promoter.mainContactRole ?? "",
        analystComment: promoter.analystComment ?? "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [open, mode, promoter]);

  if (!open) return null;

  async function submit() {
    setSaving(true);
    const url = mode === "create" ? "/api/promoters" : `/api/promoters/${promoter?.id}`;
    const method = mode === "create" ? "POST" : "PUT";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("La sauvegarde a échoué");
      window.location.reload();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erreur de sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="pi-modal-overlay">
      <div className="pi-modal pi-modal-wide">
        <div className="pi-modal-header">
          <h2>{mode === "create" ? "Nouveau promoteur" : "Modifier le promoteur"}</h2>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="pi-form-grid">
          {[
            ["Code promoteur", "promoterCode"],
            ["Raison sociale", "legalName"],
            ["Nom commercial", "tradeName"],
            ["ICE", "ice"],
            ["RC", "rc"],
            ["Forme juridique", "legalForm"],
            ["Groupe", "groupName"],
            ["Type promoteur", "promoterType"],
            ["Spécialisation", "specialization"],
            ["Ville dominante", "dominantCity"],
            ["Zone dominante", "dominantZone"],
            ["Standing dominant", "dominantStanding"],
            ["Expérience PI (années)", "piExperienceYears"],
            ["Ancienneté relation banque", "bankRelationshipYears"],
            ["Contact principal", "mainContactName"],
            ["Fonction du contact", "mainContactRole"],
          ].map(([label, key]) => (
            <label key={String(key)} className="pi-form-field">
              <span>{label}</span>
              <input className="pi-input" value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
            </label>
          ))}
          <label className="pi-form-field pi-form-field-full">
            <span>Commentaire analyste</span>
            <textarea className="pi-input" rows={4} value={form.analystComment} onChange={(e) => setForm({ ...form, analystComment: e.target.value })} />
          </label>
          <div className="pi-checkbox-row pi-form-field-full">
            {[
              ["Client banque", "isBankClient"],
              ["Watchlist", "watchlistFlag"],
              ["Restructuration", "restructuringFlag"],
              ["Contentieux", "litigationFlag"],
            ].map(([label, key]) => (
              <label key={String(key)} className="pi-checkbox-item">
                <input type="checkbox" checked={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.checked })} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="pi-modal-actions">
          <button className="pi-secondary-btn" onClick={onClose}>Annuler</button>
          <button className="pi-primary-btn" onClick={submit} disabled={saving || !form.promoterCode || !form.legalName}>
            {saving ? "Enregistrement..." : mode === "create" ? "Créer" : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}
