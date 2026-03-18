import type { GuaranteesViewModel } from "@/lib/pi/types";

type Props = { guarantees: GuaranteesViewModel };

function fmt(v: number | null, suffix = "") { return v === null ? "-" : `${v.toLocaleString("fr-MA", { maximumFractionDigits: 1 })}${suffix}`; }

export function GuaranteesSection({ guarantees }: Props) {
  return (
    <div className="pi-field-grid">
      <div className="pi-field"><label>Couverture garanties</label><div>{fmt(guarantees.guaranteeCoveragePct, "%")}</div></div>
      <div className="pi-field"><label>Qualité package sûretés</label><div>{fmt(guarantees.packageQualityScore, "/100")}</div></div>
      <div className="pi-field pi-field-span-2"><label>Niveau de hardening</label><div>{guarantees.hardeningLevel ?? "-"}</div></div>
    </div>
  );
}
