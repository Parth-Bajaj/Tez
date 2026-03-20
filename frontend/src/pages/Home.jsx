import { Link } from "react-router-dom";
import { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import Loader from "../components/common/Loader";
import NewsFeed from "../components/news/NewsFeed";
import Button from "../components/common/Button";

export default function Home() {
  const { news, loading, savedIds, toggleSave } = useContext(NewsContext);

  return (
    <div className="home-page">
      <section className="hero-panel reveal">
        <div className="hero-copy">
          <p className="eyebrow">Short-form, verifiable news</p>
          <h1>Read fast. Verify faster. Share with proof.</h1>
          <p>
            Tez combines AI-powered fake news detection and a blockchain-backed verification trail to help
            readers judge credibility before they spread a story.
          </p>
          <div className="hero-actions">
            <Link to="/explore">
              <Button>Start Exploring</Button>
            </Link>
            <Link to="/verify">
              <Button variant="secondary">Check a Story Hash</Button>
            </Link>
          </div>
        </div>
        <div className="hero-metrics">
          <div className="metric-ribbon">
            <span>Trust score engine</span>
            <strong>Live</strong>
          </div>
          <div className="metric-ribbon">
            <span>Ledger writes</span>
            <strong>Immutable</strong>
          </div>
          <div className="metric-ribbon">
            <span>Reading experience</span>
            <strong>Swipe-ready</strong>
          </div>
        </div>
      </section>

      <section className="section-header">
        <div>
          <p className="eyebrow">Today’s briefing</p>
          <h2>Top verified stories</h2>
        </div>
      </section>

      {loading ? (
        <Loader />
      ) : (
        <NewsFeed items={news.slice(0, 4)} savedIds={savedIds} onToggleSave={toggleSave} />
      )}
    </div>
  );
}
