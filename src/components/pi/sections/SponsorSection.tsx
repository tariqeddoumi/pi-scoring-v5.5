import type { SponsorViewModel } from "@/lib/pi/types";

type Props = { sponsor: SponsorViewModel };

function value(v: number | null) {
  return v === null ? "-" : v.toFixed(0) + "/100";
}

export function SponsorSection({ sponsor }: Props) {
  return (
    <div className="pi-field-grid">
      <div className="pi-field"><label>Promoteur</label><div>{sponsor.sponsorName}</div></div>
      <div className="pi-field"><label>Commentaire sponsor</label><div>{sponsor.sponsorComment ?? "-"}</div></div>
      <div className="pi-field"><label>Expérience</label><div>{value(sponsor.experienceScore)}</div></div>
      <div className="pi-field"><label>Track record</label><div>{value(sponsor.trackRecordScore)}</div></div>
      <div className="pi-field pi-field-span-2"><label>Relation banque</label><div>{value(sponsor.relationBankScore)}</div></div>
    </div>
  );
}
