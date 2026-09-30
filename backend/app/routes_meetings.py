from datetime import datetime, timezone
import secrets
from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from sqlalchemy import select
from sqlalchemy.orm import Session
from .audit import append_audit
from .db import get_db
from .models import Meeting, User
from .schemas import MeetingCreateIn
from .security import get_current_user, new_id

router = APIRouter(prefix="/meetings", tags=["Meetings"])

@router.get("")
def list_meetings(current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    rows = db.scalars(select(Meeting).where(Meeting.owner_id == current.id).order_by(Meeting.start_at.asc())).all()
    return [meeting_out(m) for m in rows]

def meeting_out(m: Meeting):
    return {"id": m.id, "title": m.title, "host": m.host, "date": m.start_at.date().isoformat(), "time": m.start_at.strftime("%H:%M"), "participants": m.participant_count, "status": m.status, "code": m.code}

@router.post("")
def create_meeting(payload: MeetingCreateIn, current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    start = payload.start_at
    end = payload.end_at or start
    m = Meeting(id=new_id(), owner_id=current.id, title=payload.title.strip(), host=current.name, start_at=start, end_at=end, participant_count=1, status="upcoming", code=secrets.token_urlsafe(6).replace("-", "").replace("_", "")[:8].upper())
    db.add(m); db.commit(); db.refresh(m)
    append_audit(db, current.id, "meeting.created", {"meeting_id": m.id})
    return meeting_out(m)

@router.post("/instant")
def instant_meeting(current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    now = datetime.now(timezone.utc)
    m = Meeting(id=new_id(), owner_id=current.id, title="Instant Meeting", host=current.name, start_at=now, end_at=now, participant_count=1, status="live", code=secrets.token_urlsafe(6).replace("-", "").replace("_", "")[:8].upper())
    db.add(m); db.commit(); db.refresh(m)
    append_audit(db, current.id, "meeting.started", {"meeting_id": m.id})
    return meeting_out(m)

@router.get("/join/{code}")
def get_meeting(code: str, current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    m = db.scalar(select(Meeting).where(Meeting.code == code.upper()))
    if not m: raise HTTPException(404, "Meeting not found")
    return meeting_out(m)

class RoomManager:
    def __init__(self): self.rooms: dict[str, set[WebSocket]] = {}
    async def connect(self, code: str, ws: WebSocket):
        await ws.accept(); self.rooms.setdefault(code, set()).add(ws)
    def disconnect(self, code: str, ws: WebSocket):
        peers = self.rooms.get(code); 
        if peers is not None:
            peers.discard(ws)
            if not peers: self.rooms.pop(code, None)
    async def broadcast(self, code: str, message: str, sender: WebSocket):
        for peer in list(self.rooms.get(code, set())):
            if peer is not sender:
                try: await peer.send_text(message)
                except Exception: self.disconnect(code, peer)

manager = RoomManager()

@router.websocket("/ws/{code}")
async def meeting_signaling(ws: WebSocket, code: str):
    await manager.connect(code.upper(), ws)
    try:
        while True:
            message = await ws.receive_text()
            await manager.broadcast(code.upper(), message, ws)
    except WebSocketDisconnect:
        manager.disconnect(code.upper(), ws)
