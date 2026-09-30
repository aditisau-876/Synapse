from datetime import datetime, timedelta, timezone
import os
from fastapi import APIRouter, Depends
import httpx
from .core.config import settings
from sqlalchemy import delete, select
from sqlalchemy.orm import Session
from .db import get_db
from .models import AIRecord, User
from .schemas import AIChatIn
from .security import get_current_user, new_id
from .audit import append_audit

router = APIRouter(prefix="/ai", tags=["AI Workspace"])

SYSTEM_NOTE = "You are Synapse AI. Be concise, practical, and use only information supplied in the prompt or explicitly available workspace context."

def local_response(prompt: str) -> str:
    p = prompt.lower()
    if "summar" in p or "meeting" in p:
        return "I can summarize meetings, extract decisions, and turn action items into tasks once meeting transcript/context is supplied."
    if "task" in p:
        return "I can break work into actionable tasks with priorities, owners, and due dates. Tell me the goal and constraints."
    if "file" in p or "document" in p:
        return "I can analyze a document when its contents are provided, then return key points, risks, and follow-up actions."
    return f"{SYSTEM_NOTE}\n\nFor your request: {prompt}\n\nI can work across chats, meetings, tasks, documents, and whiteboards when that workspace context is connected."

@router.post("/chat")
def chat(payload: AIChatIn, current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    now = datetime.now(timezone.utc)
    db.execute(delete(AIRecord).where(AIRecord.user_id == current.id, AIRecord.expires_at < now))
    response = local_response(payload.prompt)
    if settings.ai_api_url and settings.ai_api_key:
        try:
            headers = {"Authorization": f"Bearer {settings.ai_api_key}", "Content-Type": "application/json"}
            body = {"model": settings.ai_model, "messages": [{"role": "system", "content": SYSTEM_NOTE}, {"role": "user", "content": payload.prompt}], "temperature": 0.2}
            with httpx.Client(timeout=45) as client:
                remote = client.post(settings.ai_api_url, headers=headers, json=body)
                remote.raise_for_status()
                data = remote.json()
                response = data.get("choices", [{}])[0].get("message", {}).get("content", response)
        except Exception:
            # Keep the local fallback rather than exposing provider errors to users.
            pass
    record = AIRecord(id=new_id(), user_id=current.id, title=payload.prompt[:80], kind=payload.kind, prompt=payload.prompt, response=response, created_at=now, expires_at=now + timedelta(days=7))
    db.add(record); db.commit(); db.refresh(record)
    append_audit(db, current.id, "ai.generated", {"record_id": record.id, "kind": payload.kind})
    return {"id": record.id, "content": response, "created_at": record.created_at, "expires_at": record.expires_at}

@router.get("/history")
def history(current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    now = datetime.now(timezone.utc)
    db.execute(delete(AIRecord).where(AIRecord.user_id == current.id, AIRecord.expires_at < now))
    db.commit()
    rows = db.scalars(select(AIRecord).where(AIRecord.user_id == current.id).order_by(AIRecord.created_at.desc())).all()
    return [{"id": r.id, "title": r.title, "kind": r.kind, "prompt": r.prompt, "response": r.response, "created_at": r.created_at, "expires_at": r.expires_at} for r in rows]

@router.delete("/{record_id}")
def delete_record(record_id: str, current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    row = db.scalar(select(AIRecord).where(AIRecord.id == record_id, AIRecord.user_id == current.id))
    if row:
        db.delete(row); db.commit()
    return {"ok": True}
