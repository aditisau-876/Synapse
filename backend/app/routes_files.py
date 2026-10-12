
from pathlib import PurePosixPath
from uuid import uuid4

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    UploadFile,
)
from sqlalchemy.orm import Session

from .core.config import settings
from .db import get_db
from .models import Conversation, ConversationMember, StoredFile, User
from .security import get_current_user
from .storage import (
    create_private_file_url,
    get_supabase_client,
    upload_private_file,
)

router = APIRouter(prefix="/files", tags=["File Storage"])

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

ALLOWED_TYPES = {
    ".jpg": {"image/jpeg"},
    ".jpeg": {"image/jpeg"},
    ".png": {"image/png"},
    ".gif": {"image/gif"},
    ".webp": {"image/webp"},
    ".pdf": {"application/pdf"},
    ".txt": {"text/plain"},
    ".csv": {"text/csv", "application/vnd.ms-excel"},
    ".docx": {
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    },
    ".xlsx": {
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    },
    ".pptx": {
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    },
}


def require_conversation_member(
    conversation_id: str,
    user: User,
    db: Session,
) -> None:
    conversation = db.get(Conversation, conversation_id)

    if conversation is None:
        raise HTTPException(status_code=404, detail="Conversation not found")

    membership = db.get(
        ConversationMember,
        {
            "conversation_id": conversation_id,
            "user_id": user.id,
        },
    )

    if membership is None:
        raise HTTPException(
            status_code=403,
            detail="You are not a member of this conversation",
        )


@router.post("/upload", status_code=201)
async def upload_file(
    file: UploadFile = File(...),
    conversation_id: str | None = Form(default=None),
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    original_filename = (file.filename or "").replace("\\", "/").split("/")[-1]
    original_filename = original_filename.replace("\x00", "").strip()

    if not original_filename or original_filename in {".", ".."}:
        raise HTTPException(status_code=400, detail="Invalid filename")

    if len(original_filename) > 255:
        raise HTTPException(
            status_code=400,
            detail="Filename must be 255 characters or fewer",
        )

    suffix = PurePosixPath(original_filename).suffix.lower()
    content_type = (file.content_type or "").split(";")[0].strip().lower()

    if suffix not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=415,
            detail="This file extension is not allowed",
        )

    if content_type not in ALLOWED_TYPES[suffix]:
        raise HTTPException(
            status_code=415,
            detail="File extension and content type do not match",
        )

    if conversation_id:
        require_conversation_member(conversation_id, user, db)

    try:
        file_bytes = await file.read(MAX_FILE_SIZE + 1)

        if not file_bytes:
            raise HTTPException(status_code=400, detail="File is empty")

        if len(file_bytes) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413,
                detail="Maximum file size is 10 MB",
            )

        uploaded = upload_private_file(
            file_bytes=file_bytes,
            original_filename=original_filename,
            content_type=content_type,
        )
    finally:
        await file.close()

    object_path = uploaded["path"]

    try:
        record = StoredFile(
            id=str(uuid4()),
            owner_id=user.id,
            conversation_id=conversation_id,
            original_filename=original_filename,
            object_path=object_path,
            content_type=content_type,
            size_bytes=len(file_bytes),
        )

        db.add(record)
        db.commit()
        db.refresh(record)

    except Exception:
        db.rollback()

        # Remove the uploaded object if metadata could not be saved.
        try:
            get_supabase_client().storage.from_(
                settings.supabase_storage_bucket
            ).remove([object_path])
        except Exception:
            pass

        raise HTTPException(
            status_code=500,
            detail="File metadata could not be saved",
        ) from None

    return {
        "id": record.id,
        "filename": record.original_filename,
        "content_type": record.content_type,
        "size_bytes": record.size_bytes,
        "conversation_id": record.conversation_id,
        "created_at": record.created_at.isoformat(),
    }


@router.get("/{file_id}/download")
def download_file(
    file_id: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    record = db.get(StoredFile, file_id)

    if record is None:
        raise HTTPException(status_code=404, detail="File not found")

    if record.conversation_id:
        require_conversation_member(record.conversation_id, user, db)
    elif record.owner_id != user.id:
        raise HTTPException(status_code=403, detail="Access denied")

    try:
        signed_url = create_private_file_url(
            record.object_path,
            expires_in=300,
        )
    except Exception:
        raise HTTPException(
            status_code=502,
            detail="Could not create a secure download link",
        ) from None

    return {
        "id": record.id,
        "filename": record.original_filename,
        "content_type": record.content_type,
        "size_bytes": record.size_bytes,
        "download_url": signed_url,
        "expires_in_seconds": 300,
    }