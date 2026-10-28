import requests


QUOTE_API_URL = "https://dummyjson.com/quotes/random"


class QuoteServiceError(Exception):
    pass


def fetch_quote() -> dict:
    try:
        response = requests.get(QUOTE_API_URL, timeout=10)
        response.raise_for_status()
        payload = response.json()
    except (requests.RequestException, ValueError) as error:
        raise QuoteServiceError("The quote service is temporarily unavailable.") from error

    quote_id = payload.get("id")
    quote_text = payload.get("quote")
    author = payload.get("author")
    if not isinstance(quote_id, int) or not all(
        isinstance(value, str) and value.strip()
        for value in (quote_text, author)
    ):
        raise QuoteServiceError("The quote service returned an invalid response.")

    return {"quoteId": quote_id, "quote": quote_text.strip(), "author": author.strip()}
