import api from "./api";
import { mockNews } from "./mockData";

export async function getNews() {
  try {
    const response = await api.get("/news");
    return response.data;
  } catch (error) {
    return mockNews;
  }
}

export async function getNewsById(newsId) {
  const items = await getNews();
  return items.find((item) => item.id === newsId) || null;
}

export async function uploadNews(article) {
  try {
    const response = await api.post("/news", article);
    return response.data;
  } catch (error) {
    return {
      ...article,
      id: crypto.randomUUID(),
      prediction: "pending",
      confidence: 0,
      credibilityScore: 50,
    };
  }
}

export async function reportNews(report) {
  try {
    return await api.post("/reports", report);
  } catch (error) {
    return { message: "Report saved locally." };
  }
}

