from datetime import datetime, timezone
import json
import secrets
from fastapi import APIRouter, Depends, HTTPException, Query, WebSocket, WebSocketDisconnect
from sqlalchemy import select
from sqlalchemy.orm import Session
from .audit import append_audit
from .db import get_db
from .models import Meeting, User
from .schemas import MeetingCreateIn
from .security import decode_access_token, get_current_user, new_id

router = APIRouter(prefix="/meetings", tags=["Meetings"])

@router.get("")
def list_meetings(current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    rows = db.scalars(select(Meeting).where(Meeting.owner_id == current.id).order_by(Meeting.start_at.asc())).all()
    return [meeting_out(m) for m in rows]

def _utc(dt: datetime) -> datetime:
    # SQLite drops the timezone; everything we store is UTC.
    return dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)

def meeting_out(m: Meeting):
    start = _utc(m.start_at)
    return {"id": m.id, "title": m.title, "host": m.host, "date": start.date().isoformat(), "time": start.strftime("%H:%M"), "start_at": start.isoformat(), "participants": m.participant_count, "status": m.status, "code": m.code}

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

MAX_ROOM_SIZE = 12          # full-mesh WebRTC gets heavy beyond this
MAX_MESSAGE_BYTES = 64 * 1024


class RoomManager:
    def __init__(self):
        self.rooms: dict[str, set[WebSocket]] = {}
        self.client_ids: dict[WebSocket, str] = {}

    def size(self, code: str) -> int:
        return len(self.rooms.get(code, set()))

    def add(self, code: str, ws: WebSocket):
        self.rooms.setdefault(code, set()).add(ws)

    def disconnect(self, code: str, ws: WebSocket) -> str | None:
        peers = self.rooms.get(code)
        if peers is not None:
            peers.discard(ws)
            if not peers:
                self.rooms.pop(code, None)
        return self.client_ids.pop(ws, None)

    async def broadcast(self, code: str, message: str, sender: WebSocket):
        for peer in list(self.rooms.get(code, set())):
            if peer is not sender:
                try:
                    await peer.send_text(message)
                except Exception:
                    self.disconnect(code, peer)


manager = RoomManager()


@router.websocket("/ws/{code}")
async def meeting_signaling(ws: WebSocket, code: str, token: str = Query(default=""), db: Session = Depends(get_db)):
    """Signaling relay. Requires ?token=<access token> and an existing meeting.

    Close codes are sent after accept() so the browser can read them:
    1008 = not allowed (bad token, unknown meeting, room full).
    """
    code = code.upper()
    await ws.accept()
    try:
        user = db.get(User, decode_access_token(token))
    except (HTTPException, ValueError):
        user = None
    meeting = db.scalar(select(Meeting).where(Meeting.code == code)) if user else None
    if not user or not meeting or manager.size(code) >= MAX_ROOM_SIZE:
        await ws.close(code=1008)
        return

    manager.add(code, ws)
    try:
        while True:
            message = await ws.receive_text()
            if len(message) > MAX_MESSAGE_BYTES:
                continue
            try:
                data = json.loads(message)
                if data.get("type") == "join" and isinstance(data.get("clientId"), str):
                    manager.client_ids[ws] = data["clientId"]
            except (ValueError, AttributeError):
                continue
            await manager.broadcast(code, message, ws)
    except WebSocketDisconnect:
        pass
    finally:
        client_id = manager.disconnect(code, ws)
        if client_id:  # tell everyone else, even if the tab was closed without a goodbye
            await manager.broadcast(code, json.dumps({"type": "leave", "clientId": client_id}), ws)
