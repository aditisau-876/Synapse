from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from .audit import append_audit
from .db import get_db
from .models import Conversation, ConversationMember, User
from .schemas import ConversationCreateIn
from .security import get_current_user, new_id

router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("/conversations")
def create_conversation(payload: ConversationCreateIn, current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    members = list(dict.fromkeys([current.id, *payload.participant_ids]))
    for user_id in members:
        if not db.get(User, user_id):
            raise HTTPException(404, f"User {user_id} not found")
    if len(members) == 2:
        # Reuse an existing one-to-one conversation instead of creating duplicates.
        mine = select(ConversationMember.conversation_id).where(ConversationMember.user_id == members[0])
        theirs = select(ConversationMember.conversation_id).where(ConversationMember.user_id == members[1])
        existing = db.scalar(select(Conversation).where(Conversation.type == "direct", Conversation.id.in_(mine), Conversation.id.in_(theirs)))
        if existing:
            return {"id": existing.id, "type": existing.type, "member_ids": members}
    conversation = Conversation(id=new_id(), type="group" if len(members) > 2 else "direct")
    db.add(conversation)
    for user_id in members:
        db.add(ConversationMember(conversation_id=conversation.id, user_id=user_id))
    db.commit()
    append_audit(db, current.id, "conversation.created", {"conversation_id": conversation.id, "member_count": len(members)})
    return {"id": conversation.id, "type": conversation.type, "member_ids": members}

def _iso(dt: datetime | None):
    if dt is None:
        return None
    return (dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)).isoformat()

@router.get("/conversations")
def conversations(current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Conversations the user belongs to, with member names so the UI can render them."""
    ids = [m.conversation_id for m in db.scalars(select(ConversationMember).where(ConversationMember.user_id == current.id)).all()]
    if not ids:
        return []
    convs = {c.id: c for c in db.scalars(select(Conversation).where(Conversation.id.in_(ids))).all()}
    rows = db.execute(
        select(ConversationMember.conversation_id, User)
        .join(User, User.id == ConversationMember.user_id)
        .where(ConversationMember.conversation_id.in_(ids))
    ).all()
    by_conv: dict[str, list[User]] = {}
    for cid, user in rows:
        by_conv.setdefault(cid, []).append(user)

    now = datetime.now(timezone.utc)
    def is_online(u: User) -> bool:
        seen = u.last_seen if u.last_seen.tzinfo else u.last_seen.replace(tzinfo=timezone.utc)
        return (now - seen).total_seconds() < 120

    out = []
    for cid in ids:
        c = convs.get(cid)
        if not c:
            continue
        out.append({
            "id": cid,
            "type": c.type,
            "created_at": _iso(c.created_at),
            "members": [
                {"id": u.id, "name": u.name, "avatar": u.avatar, "online": is_online(u), "last_seen": _iso(u.last_seen)}
                for u in by_conv.get(cid, [])
            ],
        })
    out.sort(key=lambda x: x["created_at"] or "", reverse=True)
    return out

@router.get("/{conversation_id}/messages")
def messages(conversation_id: str, current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    from .models import EncryptedMessage
    member = db.scalar(select(ConversationMember).where(
        ConversationMember.conversation_id == conversation_id,
        ConversationMember.user_id == current.id,
    ))
    if not member:
        raise HTTPException(403, "Not a member")
    rows = db.scalars(select(EncryptedMessage).where(EncryptedMessage.conversation_id == conversation_id).order_by(EncryptedMessage.created_at.asc())).all()
    return [{"id": r.id, "sender_id": r.sender_id, "ciphertext": r.ciphertext, "nonce": r.nonce, "sender_public_key": r.sender_public_key, "created_at": r.created_at} for r in rows]
