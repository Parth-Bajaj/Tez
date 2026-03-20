export default function CredibilityMeter({ score = 0 }) {
  return (
    <div className="credibility-meter">
      <div className="credibility-track">
        <div className="credibility-fill" style={{ width: `${score}%` }} />
      </div>
      <span>{score}/100 credible</span>
    </div>
  );
}

