from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .db import Base, engine
from .routes_auth import router as auth_router
from .routes_security import router as security_router
from .routes_health import router as health_router
from .routes_chat import router as chat_router
from .routes_tasks import router as tasks_router
from .routes_meetings import router as meetings_router
from .routes_ai import router as ai_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.app_name, version="2.0.0", docs_url="/docs" if settings.environment != "production" else None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[x.strip() for x in settings.cors_origins.split(",") if x.strip()],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(security_router)
app.include_router(chat_router)
app.include_router(tasks_router)
app.include_router(meetings_router)
app.include_router(ai_router)

@app.get("/")
def root():
    return {"message": "Synapse API", "status": "online", "security": {"encrypted_messages": True, "audit_chain": True}}
