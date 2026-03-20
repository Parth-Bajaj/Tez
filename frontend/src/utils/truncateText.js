export default function truncateText(text, limit = 140) {
  if (!text) return "";
  return text.length <= limit ? text : `${text.slice(0, limit).trim()}...`;
}

