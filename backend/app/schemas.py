from datetime import datetime
from pydantic import BaseModel, EmailStr, Field

class SignupIn(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str | None = Field(default=None, min_length=7, max_length=32)
    password: str = Field(min_length=8, max_length=128)

class LoginIn(BaseModel):
    identifier: str
    password: str

class VerifyOTPIn(BaseModel):
    challenge_id: str
    code: str = Field(min_length=6, max_length=6)

class ResetPasswordIn(BaseModel):
    challenge_id: str
    code: str = Field(min_length=6, max_length=6)
    new_password: str = Field(min_length=8, max_length=128)

class RefreshIn(BaseModel):
    refresh_token: str

class LogoutIn(BaseModel):
    refresh_token: str | None = None

class PublicKeyIn(BaseModel):
    algorithm: str = "ECDH-P256"
    public_key: str
    fingerprint: str = Field(min_length=64, max_length=64)

class EncryptedMessageIn(BaseModel):
    conversation_id: str
    recipient_id: str | None = None
    ciphertext: str
    nonce: str
    sender_public_key: str

class ConversationCreateIn(BaseModel):
    participant_ids: list[str] = Field(min_length=1)

class PasswordChangeIn(BaseModel):
    current_password: str
    new_password: str = Field(min_length=8, max_length=128)

class SessionOut(BaseModel):
    id: str
    device_name: str
    last_active: datetime
    created_at: datetime


class TaskCreateIn(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: str = ""
    priority: str = "Medium"
    status: str = "todo"
    assignee: str | None = None
    due_date: str = ""
    progress: int = Field(default=0, ge=0, le=100)
    labels: list[str] = []

class TaskUpdateIn(BaseModel):
    title: str | None = None
    description: str | None = None
    priority: str | None = None
    status: str | None = None
    assignee: str | None = None
    due_date: str | None = None
    progress: int | None = Field(default=None, ge=0, le=100)
    labels: list[str] | None = None

class MeetingCreateIn(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    start_at: datetime
    end_at: datetime | None = None

class AIChatIn(BaseModel):
    prompt: str = Field(min_length=1, max_length=10000)
    kind: str = "chat"

class AIRecordOut(BaseModel):
    id: str
    title: str
    kind: str
    prompt: str
    response: str
    created_at: datetime
    expires_at: datetime
