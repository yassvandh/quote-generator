import React from "react";

export default function QuoteCard({ quote }) {
  return (
    <article className="quote-card" aria-live="polite">
      <span className="quote-mark" aria-hidden="true">“</span>
      <blockquote>{quote.quote}</blockquote>
      <p className="author">— {quote.author}</p>
    </article>
  );
}
