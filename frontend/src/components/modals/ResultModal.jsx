import { motion } from "framer-motion";

import Button from "@/components/common/Button";
import PredictionBadge from "@/components/feed/PredictionBadge";

function highlightText(text, importantWords = []) {
  if (!text) {
    return null;
  }

  const words = new Set(importantWords.map((word) => word.toLowerCase()));
  return text.split(/(\s+)/).map((part, index) => {
    const normalized = part.replace(/[^\w]/g, "").toLowerCase();
    const isHighlighted = words.has(normalized);
    return (
      <span
        key={`${part}-${index}`}
        className={isHighlighted ? "rounded bg-orange-100 px-1 text-ember" : ""}
      >
        {part}
      </span>
    );
  });
}

export default function ResultModal({ open, result, onClose }) {
  if (!open || !result) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full max-w-3xl rounded-[32px] bg-white p-6 shadow-card dark:bg-slate-900 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ember">
              Prediction Result
            </p>
            <h3 className="mt-3 font-display text-3xl font-bold text-ink dark:text-white">
              {result.headline || "Verification complete"}
            </h3>
          </div>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <PredictionBadge label={result.label} confidence={result.confidence} />
          <span className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-200">
            Confidence {Math.round((result.confidence || 0) * 100)}%
          </span>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-800">
              <p className="text-sm font-semibold text-ink dark:text-white">Why this is {result.label}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {result.explanation || "No explanation returned."}
              </p>
            </div>

            <div className="rounded-3xl bg-sand p-5 dark:bg-slate-800">
              <p className="text-sm font-semibold text-ink dark:text-white">Highlighted text</p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {highlightText(result.text, result.important_words)}
              </p>
            </div>
          </div>

          <div className="space-y-6">
          <div className="rounded-3xl bg-sand p-5 dark:bg-slate-800">
            <p className="text-sm font-semibold text-ink">Important words</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(result.important_words || []).length ? (
                result.important_words.map((word) => (
                  <span
                    key={word}
                    className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-ember shadow-sm"
                  >
                    {word}
                  </span>
                ))
              ) : (
                <span className="text-sm text-slate-500">No keyword breakdown returned.</span>
              )}
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-800">
            <p className="text-sm font-semibold text-ink dark:text-white">Model breakdown</p>
            <div className="mt-4 space-y-3">
              {Object.entries(result.model_breakdown || {}).map(([model, label]) => (
                <div
                  key={model}
                  className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 dark:bg-slate-900"
                >
                  <span className="text-sm font-medium capitalize text-slate-500 dark:text-slate-300">
                    {model.replace("_", " ")}
                  </span>
                  <span
                    className={`text-sm font-bold ${label === "REAL" ? "text-real" : "text-fake"}`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
