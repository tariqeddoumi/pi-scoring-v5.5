"use client";

import { useEffect, useMemo, useState } from "react";
import { PromoterDetail } from "@/lib/promoters/types";

type Props = {
  open: boolean;
  mode: "create" | "edit";
  promoter?: PromoterDetail | null;
  onClose: () => void;
};

type TabKey = "identity" | "profile" | "bank" | "summary";

const tabs: { key: TabKey; label: string }[] = [
  { key: "identity", label: "Identité" },
  { key: "profile", label: "Profil" },
  { key: "bank", label: "Relation banque" },
  { key: "summary", label: "Synthèse" },
];

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

export default function PromoterFormModal({
  open,
  mode,
  promoter,
  onClose,
}: Props) {
  const [form, setForm] = useState<any>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("identity");

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

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

    setActiveTab("identity");
  }, [open, mode, promoter]);

  const completion = useMemo(() => {
    const identity = [
      form.promoterCode,
      form.legalName,
      form.tradeName,
      form.ice,
      form.rc,
      form.legalForm,
    ].filter(Boolean).length;

    const profile = [
      form.groupName,
      form.promoterType,
      form.specialization,
      form.dominantCity,
      form.dominantZone,
      form.dominantStanding,
      form.piExperienceYears,
    ].filter(Boolean).length;

    const bank = [
      form.isBankClient ? "x" : "",
      form.bankRelationshipYears,
      form.watchlistFlag ? "x" : "",
      form.restructuringFlag ? "x" : "",
      form.litigationFlag ? "x" : "",
      form.mainContactName,
      form.mainContactRole,
    ].filter(Boolean).length;

    const summary = [form.analystComment].filter(Boolean).length;

    return {
      identity,
      profile,
      bank,
      summary,
    };
  }, [form]);

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

  function renderField(label: string, key: string, full = false) {
    return (
      <label
        key={key}
        className={`pi-form-field ${full ? "pi-form-field-full" : ""}`}
      >
        <span>{label}</span>
        <input
          className="pi-input"
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        />
      </label>
    );
  }

  return (
    <div className="pi-modal-overlay" onClick={onClose}>
      <div
        className="pi-modal pi-modal-wide pi-modal-scrollable"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pi-modal-header pi-modal-header-sticky">
          <div>
            <p className="pi-modal-kicker">
              {mode === "create" ? "Nouveau promoteur" : "Modification promoteur"}
            </p>
            <h2>{mode === "create" ? "Créer un promoteur" : "Modifier le promoteur"}</h2>
          </div>

          <div className="pi-modal-header-right">
            <div className="pi-completion-pill">
              Complétude :{" "}
              <strong>
                {[
                  completion.identity,
                  completion.profile,
                  completion.bank,
                  completion.summary,
                ].reduce((a, b) => a + b, 0)}
              </strong>
            </div>

            <button onClick={onClose} className="pi-modal-close-btn" type="button">
              ✕
            </button>
          </div>
        </div>

        <div className="pi-tabs-bar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`pi-tab-btn ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pi-modal-body-scroll">
          {activeTab === "identity" && (
            <div className="pi-tab-panel">
              <div className="pi-section-title-row">
                <div>
                  <h3>Identité du promoteur</h3>
                  <p>Informations administratives et signalétiques de base.</p>
                </div>
              </div>

              <div className="pi-form-grid">
                {renderField("Code promoteur", "promoterCode")}
                {renderField("Raison sociale", "legalName")}
                {renderField("Nom commercial", "tradeName")}
                {renderField("ICE", "ice")}
                {renderField("RC", "rc")}
                {renderField("Forme juridique", "legalForm")}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="pi-tab-panel">
              <div className="pi-section-title-row">
                <div>
                  <h3>Profil promoteur</h3>
                  <p>Positionnement, spécialisation et empreinte marché.</p>
                </div>
              </div>

              <div className="pi-form-grid">
                {renderField("Groupe d'affaire", "groupName")}
                {renderField("Type promoteur", "promoterType")}
                {renderField("Spécialisation", "specialization")}
                {renderField("Ville dominante", "dominantCity")}
                {renderField("Zone dominante", "dominantZone")}
                {renderField("Standing dominant", "dominantStanding")}
                {renderField("Expérience PI (années)", "piExperienceYears")}
              </div>
            </div>
          )}

          {activeTab === "bank" && (
            <div className="pi-tab-panel">
              <div className="pi-section-title-row">
                <div>
                  <h3>Relation avec la banque</h3>
                  <p>Lecture relationnelle, incidents et contact principal.</p>
                </div>
              </div>

              <div className="pi-form-grid">
                {renderField("Ancienneté relation banque", "bankRelationshipYears")}
                {renderField("Contact principal", "mainContactName")}
                {renderField("Fonction du contact", "mainContactRole")}

                <div className="pi-form-field pi-form-field-full">
                  <span>Indicateurs relationnels</span>
                  <div className="pi-checkbox-row">
                    {[
                      ["Client banque", "isBankClient"],
                      ["Watchlist", "watchlistFlag"],
                      ["Restructuration", "restructuringFlag"],
                      ["Contentieux", "litigationFlag"],
                    ].map(([label, key]) => (
                      <label key={String(key)} className="pi-checkbox-item">
                        <input
                          type="checkbox"
                          checked={form[key]}
                          onChange={(e) =>
                            setForm({ ...form, [key]: e.target.checked })
                          }
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "summary" && (
            <div className="pi-tab-panel">
              <div className="pi-section-title-row">
                <div>
                  <h3>Synthèse analyste</h3>
                  <p>Appréciation libre et première lecture du promoteur.</p>
                </div>
              </div>

              <div className="pi-form-grid">
                <label className="pi-form-field pi-form-field-full">
                  <span>Commentaire analyste</span>
                  <textarea
                    className="pi-input pi-textarea"
                    rows={8}
                    value={form.analystComment}
                    onChange={(e) =>
                      setForm({ ...form, analystComment: e.target.value })
                    }
                  />
                </label>

                <div className="pi-summary-box pi-form-field-full">
                  <div className="pi-summary-line">
                    <strong>Code :</strong> {form.promoterCode || "-"}
                  </div>
                  <div className="pi-summary-line">
                    <strong>Promoteur :</strong> {form.legalName || "-"}
                  </div>
                  <div className="pi-summary-line">
                    <strong>Ville dominante :</strong> {form.dominantCity || "-"}
                  </div>
                  <div className="pi-summary-line">
                    <strong>Standing dominant :</strong> {form.dominantStanding || "-"}
                  </div>
                  <div className="pi-summary-line">
                    <strong>Client banque :</strong> {form.isBankClient ? "Oui" : "Non"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pi-modal-actions pi-modal-actions-sticky">
          <div className="pi-tab-navigation">
            {activeTab !== "identity" && (
              <button
                type="button"
                className="pi-secondary-btn"
                onClick={() => {
                  const index = tabs.findIndex((t) => t.key === activeTab);
                  setActiveTab(tabs[index - 1].key);
                }}
              >
                Précédent
              </button>
            )}

            {activeTab !== "summary" && (
              <button
                type="button"
                className="pi-secondary-btn"
                onClick={() => {
                  const index = tabs.findIndex((t) => t.key === activeTab);
                  setActiveTab(tabs[index + 1].key);
                }}
              >
                Suivant
              </button>
            )}
          </div>

          <div className="pi-modal-actions-right">
            <button className="pi-secondary-btn" onClick={onClose} type="button">
              Annuler
            </button>

            <button
              className="pi-primary-btn"
              onClick={submit}
              disabled={saving || !form.promoterCode || !form.legalName}
              type="button"
            >
              {saving
                ? "Enregistrement..."
                : mode === "create"
                ? "Créer"
                : "Enregistrer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
