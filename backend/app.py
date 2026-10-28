from flask import Flask, jsonify
from flask_cors import CORS

from database import get_connection, initialize_database, quote_to_dict
from quote_service import QuoteServiceError, fetch_quote


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.get("/api/health")
def health():
    return jsonify({"status": "ok"})


@app.get("/api/quote/random")
def random_quote():
    try:
        quote = fetch_quote()
    except QuoteServiceError as error:
        return jsonify({"error": str(error)}), 502

    with get_connection() as connection:
        cursor = connection.execute(
            """
            INSERT INTO quotes (quote_id, quote_text, author)
            VALUES (?, ?, ?)
            """,
            (quote["quoteId"], quote["quote"], quote["author"]),
        )
        row = connection.execute(
            "SELECT * FROM quotes WHERE id = ?", (cursor.lastrowid,)
        ).fetchone()

    return jsonify(quote_to_dict(row)), 201


@app.get("/api/quotes/history")
def quote_history():
    with get_connection() as connection:
        rows = connection.execute(
            "SELECT * FROM quotes ORDER BY datetime(created_at) DESC, id DESC"
        ).fetchall()
    return jsonify([quote_to_dict(row) for row in rows])


@app.delete("/api/quotes/history/<int:history_id>")
def delete_quote(history_id: int):
    with get_connection() as connection:
        cursor = connection.execute("DELETE FROM quotes WHERE id = ?", (history_id,))
    if cursor.rowcount == 0:
        return jsonify({"error": "Quote history entry not found."}), 404
    return jsonify({"message": "Quote deleted successfully."})


initialize_database()


if __name__ == "__main__":
    app.run(debug=True, port=5000)
