import Badge from "../common/Badge";

export default function PredictionBadge({ label, confidence }) {
  const tone = label === "real" ? "success" : label === "fake" ? "danger" : "warning";
  const prettyLabel = label ? label.toUpperCase() : "PENDING";
  return <Badge tone={tone}>{`${prettyLabel} • ${Math.round((confidence || 0) * 100)}%`}</Badge>;
}

