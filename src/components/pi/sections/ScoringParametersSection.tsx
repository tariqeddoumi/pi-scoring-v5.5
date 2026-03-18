import type { ParametersViewModel } from "@/lib/pi/types";

type Props = { parameters: ParametersViewModel };

export function ScoringParametersSection({ parameters }: Props) {
  return (
    <div className="pi-field-grid">
      <div className="pi-field"><label>Version modèle</label><div>{parameters.modelCode}</div></div>
      <div className="pi-field"><label>Segment appliqué</label><div>{parameters.segment ?? "-"}</div></div>
      <div className="pi-field"><label>Zone appliquée</label><div>{parameters.zone ?? "-"}</div></div>
      <div className="pi-field"><label>Alpha</label><div>{parameters.alpha.toFixed(2)}</div></div>
      <div className="pi-field"><label>Beta</label><div>{parameters.beta.toFixed(2)}</div></div>
      <div className="pi-field pi-field-span-2"><label>Méthodologie</label><div>{parameters.methodologyNote}</div></div>
    </div>
  );
}
