# Quote Generator with History

A beginner-friendly full-stack quote app. The React frontend requests inspirational quotes from a Flask backend, and every successful quote is stored in SQLite history.

## Requirements

- Python 3.9+
- Node.js 18+

## Run the backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

The API runs at `http://localhost:5000`. Keep this terminal running while using the frontend. The SQLite database is created automatically at `backend/quotes.db`.

## Run the frontend

In a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`. During local development, Vite proxies `/api` requests to Flask, so the browser does not need a separate CORS setup.

If the page displays “The backend is not running”, start the backend command above first and refresh the page.

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Check backend status |
| GET | `/api/quote/random` | Fetch, save, and return a quote |
| GET | `/api/quotes/history` | Return newest saved quotes first |
| DELETE | `/api/quotes/history/<id>` | Delete one saved quote |

The backend validates the DummyJSON response, handles network failures with a friendly `502` response, and uses parameterized SQLite queries. No API secret is needed or stored in the frontend.

## Verify the API

With the backend running, use these PowerShell commands:

```powershell
Invoke-RestMethod http://localhost:5000/api/health
Invoke-RestMethod http://localhost:5000/api/quote/random
Invoke-RestMethod http://localhost:5000/api/quotes/history
# Replace 1 with the returned database id:
Invoke-RestMethod http://localhost:5000/api/quotes/history/1 -Method Delete
```
