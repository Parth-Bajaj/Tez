import { createContext, useEffect, useState } from "react";
import { getNews, reportNews, uploadNews } from "../services/newsService";

export const NewsContext = createContext(null);

export function NewsProvider({ children }) {
  const [news, setNews] = useState([]);
  const [savedIds, setSavedIds] = useState(() => JSON.parse(localStorage.getItem("tez-saved") || "[]"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNews = async () => {
    setLoading(true);
    setError("");
    try {
      const items = await getNews();
      setNews(items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    localStorage.setItem("tez-saved", JSON.stringify(savedIds));
  }, [savedIds]);

  const toggleSave = (newsId) => {
    setSavedIds((current) =>
      current.includes(newsId) ? current.filter((id) => id !== newsId) : [...current, newsId]
    );
  };

  const addNews = async (article) => {
    const created = await uploadNews(article);
    setNews((current) => [created, ...current]);
    return created;
  };

  const fileReport = async (report) => reportNews(report);

  const value = {
    news,
    loading,
    error,
    refreshNews: loadNews,
    addNews,
    fileReport,
    savedNews: news.filter((item) => savedIds.includes(item.id)),
    savedIds,
    toggleSave,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
}
