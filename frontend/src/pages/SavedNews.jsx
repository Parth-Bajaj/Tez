import { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import NewsFeed from "../components/news/NewsFeed";

export default function SavedNews() {
  const { savedNews, savedIds, toggleSave } = useContext(NewsContext);

  return (
    <div className="stack-page">
      <section className="section-header">
        <div>
          <p className="eyebrow">Saved</p>
          <h1>Your verification queue</h1>
        </div>
      </section>
      <NewsFeed items={savedNews} savedIds={savedIds} onToggleSave={toggleSave} />
    </div>
  );
}

