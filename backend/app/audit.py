import hashlib, json
from sqlalchemy import select
from sqlalchemy.orm import Session
from .models import AuditEvent

GENESIS = "0" * 64

def append_audit(db: Session, actor_id: str | None, event_type: str, payload: dict):
    payload_hash = hashlib.sha256(json.dumps(payload, sort_keys=True, separators=(",", ":")).encode()).hexdigest()
    last = db.scalar(select(AuditEvent).order_by(AuditEvent.id.desc()))
    previous = last.event_hash if last else GENESIS
    material = f"{previous}|{actor_id or ''}|{event_type}|{payload_hash}"
    event_hash = hashlib.sha256(material.encode()).hexdigest()
    event = AuditEvent(actor_id=actor_id, event_type=event_type, payload_hash=payload_hash, previous_hash=previous, event_hash=event_hash)
    db.add(event)
    db.commit()
    return event

def verify_chain(db: Session):
    events = db.scalars(select(AuditEvent).order_by(AuditEvent.id.asc())).all()
    previous = GENESIS
    for event in events:
        material = f"{previous}|{event.actor_id or ''}|{event.event_type}|{event.payload_hash}"
        expected = hashlib.sha256(material.encode()).hexdigest()
        if event.previous_hash != previous or event.event_hash != expected:
            return False, event.id
        previous = event.event_hash
    return True, None
