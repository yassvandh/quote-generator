const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, options);
  } catch {
    throw new Error(
      "The backend is not running. Start it with: python backend\\app.py"
    );
  }
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "Something went wrong. Please try again.");
  }
  return payload;
}

export function fetchRandomQuote() {
  return request("/quote/random");
}

export function fetchHistory() {
  return request("/quotes/history");
}

export function deleteHistoryQuote(id) {
  return request(`/quotes/history/${id}`, { method: "DELETE" });
}
