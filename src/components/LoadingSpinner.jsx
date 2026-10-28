import React from "react";

export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <span className="loading-label" role="status">
      <span className="spinner" aria-hidden="true" />
      {label}
    </span>
  );
}
