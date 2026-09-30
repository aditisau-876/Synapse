# Synapse

Synapse is a communication and collaboration platform combining chat, meetings, tasks, AI workspace and settings.

## What was improved in this pass

- Refined the application shell, sidebar and topbar for a more restrained product UI.
- Reworked semantic light/dark surface tokens so cards and inputs do not turn into white blocks in dark mode.
- Kept accent themes (violet, pink, blue, green, orange) with coherent gradients and contrast.
- Improved settings navigation and active-state treatment.
- Connected the existing auth UI to the FastAPI authentication endpoints.
- Added email OTP verification and phone OTP challenge endpoints.
- Added rotating refresh tokens, device sessions and authenticated route protection.
- Added a Web Crypto ECDH P-256 + AES-GCM E2EE foundation for encrypted messages.
- Added a tamper-evident off-chain audit hash chain.
- Added an optional EVM audit-root anchoring contract.
- Added AI history/summary UI with the 7-day retention notice and browser PDF workflow.

## Run

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Copy `backend/.env.example` to `backend/.env` and set a strong `JWT_SECRET`.

Read `SECURITY_ARCHITECTURE.md` before treating the application as production-ready.
