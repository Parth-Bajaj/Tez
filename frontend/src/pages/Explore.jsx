import { useContext, useState } from "react";
import { NewsContext } from "../context/NewsContext";
import NewsFeed from "../components/news/NewsFeed";

const categories = ["All", "Science", "Media", "Finance", "Governance"];

export default function Explore() {
  const { news, savedIds, toggleSave } = useContext(NewsContext);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? news : news.filter((item) => item.category === activeCategory);

  return (
    <div className="stack-page">
      <section className="section-header">
        <div>
          <p className="eyebrow">Explore</p>
          <h1>Scan categories and credibility signals</h1>
        </div>
        <div className="pill-row">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`pill ${activeCategory === category ? "pill-active" : ""}`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>
      <NewsFeed items={filtered} savedIds={savedIds} onToggleSave={toggleSave} />
    </div>
  );
}

