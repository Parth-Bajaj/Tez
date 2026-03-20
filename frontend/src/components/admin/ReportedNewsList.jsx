const sampleReports = [
  { id: 1, title: "Sleep pill claim", reason: "Medical misinformation", severity: "high" },
  { id: 2, title: "Payments freeze message", reason: "Panic-inducing rumor", severity: "critical" },
];

export default function ReportedNewsList() {
  return (
    <div className="panel">
      <h3>Recent reports</h3>
      <div className="stack-list">
        {sampleReports.map((report) => (
          <article key={report.id} className="stack-item">
            <strong>{report.title}</strong>
            <p>{report.reason}</p>
            <span className={`severity severity-${report.severity}`}>{report.severity}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

