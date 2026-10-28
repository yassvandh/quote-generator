import React, { useCallback, useEffect, useState } from "react";
import HistoryList from "./components/HistoryList";
import LoadingSpinner from "./components/LoadingSpinner";
import QuoteCard from "./components/QuoteCard";
import { deleteHistoryQuote, fetchHistory, fetchRandomQuote } from "./services/api";

export default function App() {
  const [quote, setQuote] = useState(null);
  const [history, setHistory] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [error, setError] = useState("");

  const loadHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      setHistory(await fetchHistory());
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => { loadHistory(); }, [loadHistory]);

  async function generateQuote() {
    setGenerating(true);
    setError("");
    try {
      const newQuote = await fetchRandomQuote();
      setQuote(newQuote);
      setHistory((current) => [newQuote, ...current]);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setGenerating(false);
    }
  }

  async function removeQuote(id) {
    try {
      await deleteHistoryQuote(id);
      setHistory((current) => current.filter((item) => item.id !== id));
      if (quote?.id === id) setQuote(null);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <div className="brand-mark" aria-hidden="true">✦</div>
        <p className="eyebrow">A little inspiration</p>
        <h1>Find words that<br /><em>move you.</em></h1>
        <p className="intro">Discover a fresh perspective, one quote at a time.<br />Save the ones you want to remember.</p>
      </header>

      <section className="generator-section" aria-label="Quote generator">
        {quote ? <QuoteCard quote={quote} /> : (
          <div className="quote-card placeholder-card">
            <span className="quote-mark" aria-hidden="true">“</span>
            <p>Ready when you are.</p>
            <span>Click below to uncover something wonderful.</span>
          </div>
        )}
        <button className="generate-button" onClick={generateQuote} disabled={generating}>
          {generating ? <LoadingSpinner label="Finding inspiration..." /> : <>Generate new quote <span aria-hidden="true">→</span></>}
        </button>
        {error && <p className="error-message" role="alert">{error}</p>}
      </section>

      <HistoryList history={history} loading={historyLoading} onDelete={removeQuote} />
      <footer>Built for moments of inspiration · Quotes provided by DummyJSON</footer>
    </main>
  );
}
