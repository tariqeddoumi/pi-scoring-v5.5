import type { DomainScoreViewModel } from "@/lib/pi/types";

type Props = { domains: DomainScoreViewModel[] };

function polarToCartesian(cx: number, cy: number, radius: number, angleDeg: number) {
  const angle = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
}

export function ScoringRadar({ domains }: Props) {
  const size = 220;
  const center = size / 2;
  const maxRadius = 78;
  const count = Math.max(domains.length, 3);

  const points = domains.map((domain, index) => {
    const angle = (360 / count) * index;
    const pt = polarToCartesian(center, center, (Math.max(0, Math.min(domain.score, 100)) / 100) * maxRadius, angle);
    const label = polarToCartesian(center, center, maxRadius + 24, angle);
    return { ...pt, angle, labelX: label.x, labelY: label.y, domain };
  });

  const polygon = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="pi-radar-wrap">
      <svg viewBox={`0 0 ${size} ${size}`} className="pi-radar-svg" role="img" aria-label="Répartition des scores par domaine">
        {[25, 50, 75, 100].map((level) => {
          const ring = domains.map((_, index) => {
            const angle = (360 / count) * index;
            const pt = polarToCartesian(center, center, (level / 100) * maxRadius, angle);
            return `${pt.x},${pt.y}`;
          }).join(" ");
          return <polygon key={level} points={ring} className="pi-radar-ring" />;
        })}

        {points.map((point, index) => (
          <line key={index} x1={center} y1={center} x2={point.labelX} y2={point.labelY} className="pi-radar-axis" />
        ))}

        <polygon points={polygon} className="pi-radar-area" />
        {points.map((point) => (
          <g key={point.domain.code}>
            <circle cx={point.x} cy={point.y} r="4" className="pi-radar-dot" />
            <text x={point.labelX} y={point.labelY} textAnchor="middle" className="pi-radar-label">
              {point.domain.code}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
