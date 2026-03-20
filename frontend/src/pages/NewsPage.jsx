import { useContext } from "react";
import { useParams } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";
import NotFound from "./NotFound";
import NewsDetails from "../components/news/NewsDetails";

export default function NewsPage() {
  const { news } = useContext(NewsContext);
  const { newsId } = useParams();
  const item = news.find((entry) => entry.id === newsId);

  if (!item) {
    return <NotFound />;
  }

  return <NewsDetails item={item} />;
}

