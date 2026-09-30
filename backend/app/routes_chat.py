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
    conversation = Conversation(id=new_id(), type="group" if len(members) > 2 else "direct")
    db.add(conversation)
    for user_id in members:
        db.add(ConversationMember(conversation_id=conversation.id, user_id=user_id))
    db.commit()
    append_audit(db, current.id, "conversation.created", {"conversation_id": conversation.id, "member_count": len(members)})
    return {"id": conversation.id, "type": conversation.type, "member_ids": members}

@router.get("/conversations")
def conversations(current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    memberships = db.scalars(select(ConversationMember).where(ConversationMember.user_id == current.id)).all()
    return [{"id": m.conversation_id} for m in memberships]

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
