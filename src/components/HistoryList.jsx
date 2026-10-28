import React from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function HistoryList({ history, loading, onDelete }) {
  return (
    <section className="history-section" aria-labelledby="history-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Your collection</p>
          <h2 id="history-heading">Quote history</h2>
        </div>
        <span className="count-badge">{history.length}</span>
      </div>
      {loading ? (
        <div className="state-box"><LoadingSpinner label="Loading history..." /></div>
      ) : history.length === 0 ? (
        <div className="state-box empty-state">
          <span className="empty-icon" aria-hidden="true">✦</span>
          <p>Your saved quotes will appear here.</p>
          <span>Generate your first quote to begin.</span>
        </div>
      ) : (
        <ul className="history-list">
          {history.map((item) => (
            <li className="history-item" key={item.id}>
              <div>
                <p className="history-quote">“{item.quote}”</p>
                <p className="history-author">{item.author}</p>
                <time dateTime={item.createdAt}>{new Date(`${item.createdAt}Z`).toLocaleString()}</time>
              </div>
              <button className="delete-button" onClick={() => onDelete(item.id)} aria-label={`Delete quote by ${item.author}`}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
