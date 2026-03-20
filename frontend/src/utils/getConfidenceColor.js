export default function getConfidenceColor(score = 0) {
  if (score >= 0.8) return "var(--success)";
  if (score >= 0.55) return "var(--warning)";
  return "var(--danger)";
}

