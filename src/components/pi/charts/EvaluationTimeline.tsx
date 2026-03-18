import type { HistoryItemViewModel } from "@/lib/pi/types";

type Props = { items: HistoryItemViewModel[] };

export function EvaluationTimeline({ items }: Props) {
  return (
    <div className="pi-timeline">
      {items.map((item) => (
        <div key={item.id} className="pi-timeline-item">
          <div className="pi-timeline-dot" />
          <div className="pi-timeline-content">
            <div className="pi-timeline-head">
              <strong>{item.grade ?? "-"}</strong>
              <span>{new Date(item.date).toLocaleDateString()}</span>
            </div>
            <p>Score {item.finalScore !== null ? item.finalScore.toFixed(1) : "-"} • {item.modelCode}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
