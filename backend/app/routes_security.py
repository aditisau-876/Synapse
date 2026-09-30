from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from .audit import append_audit, verify_chain
from .db import get_db
from .models import DeviceSession, PublicKey, User, RefreshToken
from .schemas import EncryptedMessageIn, PasswordChangeIn, PublicKeyIn
from .security import get_current_user, hash_password, new_id, sha256, verify_password
from .models import EncryptedMessage, Conversation, ConversationMember

router = APIRouter(prefix="/security", tags=["Security"])

@router.post("/public-key")
def publish_key(payload: PublicKeyIn, current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if payload.algorithm != "ECDH-P256":
        raise HTTPException(400, "Only ECDH-P256 is currently supported")
    if sha256(payload.public_key) != payload.fingerprint:
        raise HTTPException(400, "Public-key fingerprint mismatch")
    key = db.get(PublicKey, current.id)
    if key:
        key.algorithm, key.public_key, key.fingerprint = payload.algorithm, payload.public_key, payload.fingerprint
    else:
        db.add(PublicKey(user_id=current.id, algorithm=payload.algorithm, public_key=payload.public_key, fingerprint=payload.fingerprint))
    db.commit()
    append_audit(db, current.id, "security.public_key_updated", {"algorithm": payload.algorithm, "fingerprint": payload.fingerprint})
    return {"fingerprint": payload.fingerprint}

@router.get("/public-key/{user_id}")
def get_key(user_id: str, current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    key = db.get(PublicKey, user_id)
    if not key: raise HTTPException(404, "Public key not found")
    return {"user_id": user_id, "algorithm": key.algorithm, "public_key": key.public_key, "fingerprint": key.fingerprint}

@router.post("/encrypted-messages")
def store_encrypted_message(payload: EncryptedMessageIn, current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    conversation = db.get(Conversation, payload.conversation_id)
    if not conversation:
        conversation = Conversation(id=payload.conversation_id, type="direct")
        db.add(conversation)
        db.add(ConversationMember(conversation_id=payload.conversation_id, user_id=current.id))
        if payload.recipient_id:
            db.add(ConversationMember(conversation_id=payload.conversation_id, user_id=payload.recipient_id))
        db.commit()
    members = {m.user_id for m in db.scalars(select(ConversationMember).where(ConversationMember.conversation_id == payload.conversation_id)).all()}
    if current.id not in members or (payload.recipient_id and payload.recipient_id not in members):
        raise HTTPException(403, "Not a member of this conversation")
    msg = EncryptedMessage(id=new_id(), conversation_id=payload.conversation_id, sender_id=current.id, recipient_id=payload.recipient_id, ciphertext=payload.ciphertext, nonce=payload.nonce, sender_public_key=payload.sender_public_key)
    db.add(msg); db.commit()
    append_audit(db, current.id, "message.encrypted_stored", {"conversation_id": payload.conversation_id, "message_id": msg.id})
    return {"id": msg.id, "created_at": msg.created_at, "encrypted": True}

@router.get("/encrypted-messages/{conversation_id}")
def list_encrypted_messages(conversation_id: str, current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    members = {m.user_id for m in db.scalars(select(ConversationMember).where(ConversationMember.conversation_id == conversation_id)).all()}
    if current.id not in members: raise HTTPException(403, "Not a member")
    messages = db.scalars(select(EncryptedMessage).where(EncryptedMessage.conversation_id == conversation_id).order_by(EncryptedMessage.created_at.asc())).all()
    return [{"id": m.id, "sender_id": m.sender_id, "recipient_id": m.recipient_id, "ciphertext": m.ciphertext, "nonce": m.nonce, "sender_public_key": m.sender_public_key, "created_at": m.created_at} for m in messages]

@router.post("/password")
def change_password(payload: PasswordChangeIn, current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not verify_password(payload.current_password, current.password_hash):
        raise HTTPException(400, "Current password is incorrect")
    current.password_hash = hash_password(payload.new_password)
    db.commit()
    append_audit(db, current.id, "security.password_changed", {})
    return {"ok": True}

@router.get("/sessions")
def sessions(current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    rows = db.scalars(select(DeviceSession).where(DeviceSession.user_id == current.id).order_by(DeviceSession.last_active.desc())).all()
    return [{"id": r.id, "device_name": r.device_name, "last_active": r.last_active, "created_at": r.created_at} for r in rows]

@router.post("/audit/verify")
def audit_verify(current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    valid, broken = verify_chain(db)
    return {"valid": valid, "broken_event_id": broken}


@router.delete("/sessions/{session_id}")
def revoke_session(session_id: str, current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    row = db.scalar(select(DeviceSession).where(DeviceSession.id == session_id, DeviceSession.user_id == current.id))
    if not row: raise HTTPException(404, "Session not found")
    rt = db.get(RefreshToken, row.refresh_token_id)
    if rt: rt.revoked = True
    db.delete(row); db.commit()
    append_audit(db, current.id, "security.session_revoked", {"session_id": session_id})
    return {"ok": True}

@router.post("/sessions/revoke-all")
def revoke_all_sessions(current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    rows = db.scalars(select(DeviceSession).where(DeviceSession.user_id == current.id)).all()
    for row in rows:
        rt = db.get(RefreshToken, row.refresh_token_id)
        if rt: rt.revoked = True
    db.commit()
    append_audit(db, current.id, "security.sessions_revoked_all", {"count": len(rows)})
    return {"ok": True, "count": len(rows)}
