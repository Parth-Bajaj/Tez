export default function AdminStats({ items }) {
  const realStories = items.filter((item) => item.prediction === "real").length;
  const fakeStories = items.filter((item) => item.prediction === "fake").length;
  const avgCredibility = items.length
    ? Math.round(items.reduce((sum, item) => sum + item.credibilityScore, 0) / items.length)
    : 0;

  const stats = [
    { label: "Stories tracked", value: items.length },
    { label: "Flagged fake", value: fakeStories },
    { label: "Verified real", value: realStories },
    { label: "Avg credibility", value: `${avgCredibility}%` },
  ];

  return (
    <section className="stats-grid">
      {stats.map((stat) => (
        <article key={stat.label} className="stat-card">
          <span>{stat.label}</span>
          <strong>{stat.value}</strong>
        </article>
      ))}
    </section>
  );
}

