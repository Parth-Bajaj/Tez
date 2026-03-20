export const mockNews = [
  {
    id: "n1",
    title: "City launches public dashboard to track fact-checked civic updates",
    summary:
      "A new transparency dashboard publishes source links, claim status, and public corrections in a compact mobile format.",
    content:
      "The municipal innovation office launched a public dashboard that lets residents read verified civic updates in a short-form card layout. Each entry includes source links, a fact-check status, and a correction history to improve trust in official communication.",
    category: "Governance",
    source: "Civic Ledger",
    publishedAt: "2026-03-12T10:30:00Z",
    author: "Aarav Sen",
    image: "/news-civic.svg",
    credibilityScore: 92,
    prediction: "real",
    confidence: 0.91,
    txHash: "0x7ac3...91b4",
    storyHash: "7f9a4c1b9282f8ce0a0c1b2f0bf76e89",
  },
  {
    id: "n2",
    title: "Viral post claims scientists found a pill that ends sleep permanently",
    summary:
      "Experts say the headline is misleading and the underlying study only examined temporary alertness markers in a lab setting.",
    content:
      "A viral social post exaggerated preliminary research into fatigue management and falsely described it as a permanent replacement for sleep. Researchers quoted in the report clarified that the experiment focused on short-term alertness changes and does not support the claim made online.",
    category: "Science",
    source: "Signal Watch",
    publishedAt: "2026-03-11T16:00:00Z",
    author: "Mira Thomas",
    image: "/news-science.svg",
    credibilityScore: 33,
    prediction: "fake",
    confidence: 0.82,
    txHash: "0x1db1...0af9",
    storyHash: "f4bc21e14554f0c33aa7b90ea94b0f12",
  },
  {
    id: "n3",
    title: "Independent newsroom opens its article revision history to readers",
    summary:
      "Readers can now compare article edits, timestamps, and verification notes before sharing breaking stories.",
    content:
      "An independent newsroom has added revision history to every article, allowing readers to compare changes over time. Editors say the move is intended to reduce confusion when breaking stories evolve quickly and to show how verification decisions were made.",
    category: "Media",
    source: "Open Press",
    publishedAt: "2026-03-10T08:45:00Z",
    author: "Ishita Roy",
    image: "/news-media.svg",
    credibilityScore: 88,
    prediction: "real",
    confidence: 0.87,
    txHash: "0x93ce...14f2",
    storyHash: "1c9d3e587687adf431e53dc3180eb7cc",
  },
  {
    id: "n4",
    title: "Forwarded message says all digital payments will be frozen this weekend",
    summary:
      "Banks and regulators have not issued such a notice, and several fact-check desks marked the message as fabricated.",
    content:
      "A widely forwarded message warned of a nationwide freeze on digital payments over the weekend. No bank or regulator published any such advisory, and multiple verification desks traced the message to recycled panic posts that appear during festival seasons and system maintenance rumours.",
    category: "Finance",
    source: "Claim Check",
    publishedAt: "2026-03-09T13:20:00Z",
    author: "Dev Malhotra",
    image: "/news-finance.svg",
    credibilityScore: 26,
    prediction: "fake",
    confidence: 0.89,
    txHash: "0xab30...998d",
    storyHash: "dd8013477c15dc0030a4116f3bd57f0a",
  },
];

export const mockTransactions = mockNews.map((item, index) => ({
  id: `tx-${index + 1}`,
  title: item.title,
  txHash: item.txHash,
  storyHash: item.storyHash,
  timestamp: item.publishedAt,
  network: "Polygon Amoy",
  status: "confirmed",
}));
