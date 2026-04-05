import { motion } from "framer-motion";

import Button from "@/components/common/Button";
import PredictionBadge from "@/components/feed/PredictionBadge";

export default function NewsCard({
  article,
  cachedResult,
  loadingAction,
  onVerify,
  onVerifyAndStore
}) {
  return (
    <article className="feed-card flex min-h-screen items-center justify-center px-4 py-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-3xl rounded-[32px] bg-white p-6 shadow-card ring-1 ring-white/80 dark:bg-slate-900 dark:ring-slate-800 sm:p-8"
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-ember">
            {article.category}
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-300">{article.source}</span>
        </div>

        <div className="mt-8 space-y-5">
          <h2 className="font-display text-3xl font-bold leading-tight text-ink dark:text-white sm:text-5xl">
            {article.headline}
          </h2>
          <p className="line-clamp-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            {article.content}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {cachedResult?.label ? (
            <PredictionBadge
              label={cachedResult.label}
              confidence={cachedResult.confidence}
            />
          ) : (
            <span className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-500">
              Not verified yet
            </span>
          )}
          <span className="text-sm text-slate-500 dark:text-slate-300">
            Scroll for the next story. Tap to inspect authenticity.
          </span>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <Button
            variant="secondary"
            loading={loadingAction === "verify"}
            onClick={() => onVerify(article)}
          >
            Verify
          </Button>
          <Button
            variant="primary"
            loading={loadingAction === "store"}
            onClick={() => onVerifyAndStore(article)}
          >
            Verify & Store
          </Button>
        </div>
      </motion.div>
    </article>
  );
}
