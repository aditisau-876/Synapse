from datetime import datetime, timedelta, timezone
import hashlib
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import or_, select
from sqlalchemy.orm import Session
from .audit import append_audit
from .core.config import settings
from .db import get_db
from .models import DeviceSession, OTPChallenge, RefreshToken, User
from .schemas import LoginIn, RefreshIn, ResetPasswordIn, SignupIn, VerifyOTPIn, LogoutIn
from .security import create_access_token, generate_otp, hash_otp, hash_password, new_id, safe_compare, sha256, verify_password, create_refresh_token, get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

def token_pair(db: Session, user: User, device_name: str = "Web browser"):
    raw_refresh, expires = create_refresh_token(user.id)
    rt = RefreshToken(id=new_id(), user_id=user.id, token_hash=sha256(raw_refresh), expires_at=expires)
    session = DeviceSession(id=new_id(), user_id=user.id, device_name=device_name, refresh_token_id=rt.id)
    db.add(rt); db.add(session); db.commit()
    return {"access_token": create_access_token(user.id), "refresh_token": raw_refresh, "token_type": "bearer", "session_id": session.id}

def user_out(user: User):
    return {
        "id": user.id, "name": user.name, "email": user.email, "phone": user.phone,
        "avatar": user.avatar, "emailVerified": user.email_verified,
        "phoneVerified": user.phone_verified, "lastSeen": user.last_seen.isoformat()
    }

def issue_otp(db: Session, user: User, channel: str):
    code = generate_otp()
    challenge = OTPChallenge(
        id=new_id(), user_id=user.id, channel=channel, code_hash=hash_otp(code),
        expires_at=datetime.utcnow() + timedelta(minutes=settings.otp_minutes)
    )
    db.add(challenge)
    db.commit()
    # Production: deliver this code through a configured transactional email/SMS provider.
    return challenge, code

@router.post("/signup")
def signup(payload: SignupIn, db: Session = Depends(get_db)):
    exists = db.scalar(select(User).where(or_(User.email == payload.email, User.phone == payload.phone if payload.phone else False)))
    if exists:
        raise HTTPException(409, "An account already exists with this email or phone")
    user = User(id=new_id(), name=payload.name.strip(), email=payload.email.lower(), phone=payload.phone, password_hash=hash_password(payload.password))
    db.add(user)
    db.commit()
    challenge, code = issue_otp(db, user, "email")
    append_audit(db, user.id, "account.created", {"verification": "email"})
    result = {"user": user_out(user), "verification": {"challenge_id": challenge.id, "channel": "email", "expires_in_minutes": settings.otp_minutes}}
    if settings.dev_otp:
        result["verification"]["dev_code"] = code
    return result

@router.post("/login")
def login(payload: LoginIn, db: Session = Depends(get_db)):
    ident = payload.identifier.strip().lower()
    user = db.scalar(select(User).where(or_(User.email == ident, User.phone == payload.identifier.strip())))
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(401, "Invalid credentials")
    if not user.email_verified:
        challenge, code = issue_otp(db, user, "email")
        result = {"requires_verification": True, "challenge_id": challenge.id}
        if settings.dev_otp: result["dev_code"] = code
        return result
    tokens = token_pair(db, user)
    append_audit(db, user.id, "auth.login", {"method": "password"})
    return {"user": user_out(user), **tokens}

@router.post("/verify-email")
def verify_email(payload: VerifyOTPIn, db: Session = Depends(get_db)):
    challenge = db.get(OTPChallenge, payload.challenge_id)
    if not challenge or challenge.channel != "email" or challenge.consumed or challenge.attempts >= 5:
        raise HTTPException(400, "Invalid verification challenge")
    if challenge.expires_at < datetime.utcnow():
        raise HTTPException(400, "Verification code expired")
    challenge.attempts += 1
    if not safe_compare(challenge.code_hash, hash_otp(payload.code)):
        db.commit()
        raise HTTPException(400, "Invalid verification code")
    challenge.consumed = True
    user = db.get(User, challenge.user_id)
    user.email_verified = True
    db.commit()
    append_audit(db, user.id, "auth.email_verified", {})
    tokens = token_pair(db, user)
    return {"user": user_out(user), **tokens}



@router.post("/forgot-password")
def forgot_password(identifier: str, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(or_(User.email == identifier.lower(), User.phone == identifier)))
    # Do not reveal whether an account exists in production.
    if not user:
        return {"ok": True}
    challenge, code = issue_otp(db, user, "email")
    result = {"ok": True, "challenge_id": challenge.id}
    if settings.dev_otp: result["dev_code"] = code
    return result

@router.post("/reset-password")
def reset_password(payload: ResetPasswordIn, db: Session = Depends(get_db)):
    challenge = db.get(OTPChallenge, payload.challenge_id)
    if not challenge or challenge.consumed or challenge.attempts >= 5 or challenge.expires_at < datetime.utcnow():
        raise HTTPException(400, "Invalid or expired reset challenge")
    if not safe_compare(challenge.code_hash, hash_otp(payload.code)):
        challenge.attempts += 1
        db.commit()
        raise HTTPException(400, "Invalid reset code")
    user = db.get(User, challenge.user_id)
    user.password_hash = hash_password(payload.new_password)
    challenge.consumed = True
    refresh_rows = db.scalars(select(RefreshToken).where(RefreshToken.user_id == user.id, RefreshToken.revoked == False)).all()
    for token in refresh_rows: token.revoked = True
    db.commit()
    append_audit(db, user.id, "security.password_reset", {})
    return {"ok": True}

@router.post("/request-phone-otp")
def request_phone_otp(current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not current.phone:
        raise HTTPException(400, "No phone number is attached to this account")
    challenge, code = issue_otp(db, current, "phone")
    result = {"challenge_id": challenge.id, "channel": "phone", "expires_in_minutes": settings.otp_minutes}
    if settings.dev_otp: result["dev_code"] = code
    return result

@router.post("/verify-phone")
def verify_phone(payload: VerifyOTPIn, db: Session = Depends(get_db)):
    challenge = db.get(OTPChallenge, payload.challenge_id)
    if not challenge or challenge.channel != "phone" or challenge.consumed or challenge.attempts >= 5:
        raise HTTPException(400, "Invalid verification challenge")
    if challenge.expires_at < datetime.utcnow():
        raise HTTPException(400, "Verification code expired")
    challenge.attempts += 1
    if not safe_compare(challenge.code_hash, hash_otp(payload.code)):
        db.commit()
        raise HTTPException(400, "Invalid verification code")
    challenge.consumed = True
    user = db.get(User, challenge.user_id)
    user.phone_verified = True
    db.commit()
    append_audit(db, user.id, "auth.phone_verified", {})
    return {"user": user_out(user)}

@router.post("/refresh")
def refresh(payload: RefreshIn, db: Session = Depends(get_db)):
    rt = db.scalar(select(RefreshToken).where(RefreshToken.token_hash == sha256(payload.refresh_token)))
    if not rt or rt.revoked or rt.expires_at < datetime.utcnow():
        raise HTTPException(401, "Invalid refresh token")
    rt.revoked = True
    user = db.get(User, rt.user_id)
    db.commit()
    tokens = token_pair(db, user)
    append_audit(db, user.id, "auth.refresh", {})
    return tokens

@router.post("/logout")
def logout(payload: LogoutIn | None = None, current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if payload and payload.refresh_token:
        rt = db.scalar(select(RefreshToken).where(RefreshToken.token_hash == sha256(payload.refresh_token), RefreshToken.user_id == current.id))
        if rt:
            rt.revoked = True
    else:
        # Safe fallback: revoke all sessions if no refresh token was supplied.
        rows = db.scalars(select(RefreshToken).where(RefreshToken.user_id == current.id, RefreshToken.revoked == False)).all()
        for rt in rows: rt.revoked = True
    db.commit()
    append_audit(db, current.id, "auth.logout", {})
    return {"ok": True}

@router.get("/me")
def me(current: User = Depends(get_current_user)):
    return user_out(current)
