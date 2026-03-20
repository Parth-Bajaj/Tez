import { useState } from "react";
import NewsCard from "./NewsCard";
import NewsDetails from "./NewsDetails";
import Modal from "../common/Modal";

export default function NewsFeed({ items, savedIds = [], onToggleSave }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section className="news-feed">
        {items.map((item, index) => (
          <div key={item.id} className="news-feed-slot" style={{ animationDelay: `${index * 0.08}s` }}>
            <NewsCard
              item={item}
              isSaved={savedIds.includes(item.id)}
              onToggleSave={onToggleSave}
              onOpenDetails={setSelected}
            />
          </div>
        ))}
      </section>
      <Modal isOpen={Boolean(selected)} title="Story Snapshot" onClose={() => setSelected(null)}>
        {selected && <NewsDetails item={selected} compact />}
      </Modal>
    </>
  );
}

