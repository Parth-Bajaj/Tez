import { useEffect, useState } from "react";
import { getNews } from "../services/newsService";

export default function useFetchNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      const items = await getNews();
      if (active) {
        setNews(items);
        setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return { news, loading };
}

