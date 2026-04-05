import NewsCard from "@/components/feed/NewsCard";

export default function FeedContainer({
  articles,
  getCachedResult,
  getLoadingAction,
  onVerify,
  onVerifyAndStore
}) {
  return (
    <section className="feed-scroll h-[calc(100vh-5rem)] overflow-y-auto">
      {articles.map((article) => (
        <NewsCard
          key={article.id}
          article={article}
          cachedResult={getCachedResult(article)}
          loadingAction={getLoadingAction(article)}
          onVerify={onVerify}
          onVerifyAndStore={onVerifyAndStore}
        />
      ))}
    </section>
  );
}
