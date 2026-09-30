# Synapse backend

FastAPI foundation for authentication, verification, sessions, encrypted message storage and tamper-evident security auditing.

## Run

```bash
python -m venv .venv
# Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Copy `.env.example` to `.env` and set a strong `JWT_SECRET`.

The development server can return OTPs in responses while `DEV_OTP=true`. Never enable this in production.

Swagger is available at `/docs` in development.
