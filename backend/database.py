from pathlib import Path
import sqlite3


DATABASE_PATH = Path(__file__).resolve().parent / "quotes.db"


def get_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database() -> None:
    with get_connection() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS quotes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                quote_id INTEGER NOT NULL,
                quote_text TEXT NOT NULL,
                author TEXT NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
            """
        )


def quote_to_dict(row: sqlite3.Row) -> dict:
    return {
        "id": row["id"],
        "quoteId": row["quote_id"],
        "quote": row["quote_text"],
        "author": row["author"],
        "createdAt": row["created_at"],
    }
