
from functools import lru_cache
from uuid import uuid4
from pathlib import PurePosixPath

from supabase import create_client, Client

from .core.config import settings


@lru_cache(maxsize=1)
def get_supabase_client() -> Client:
    if not settings.supabase_url or not settings.supabase_service_role_key:
        raise RuntimeError(
            "Supabase Storage is not configured. "
            "Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
        )

    return create_client(
        settings.supabase_url,
        settings.supabase_service_role_key,
    )


def upload_private_file(
    file_bytes: bytes,
    original_filename: str,
    content_type: str = "application/octet-stream",
) -> dict:
    if not file_bytes:
        raise ValueError("Cannot upload an empty file.")

    # Store files under generated names rather than trusting user filenames.
    suffix = PurePosixPath(original_filename).suffix.lower()
    object_path = f"uploads/{uuid4().hex}{suffix}"

    client = get_supabase_client()

    result = client.storage.from_(
        settings.supabase_storage_bucket
    ).upload(
        path=object_path,
        file=file_bytes,
        file_options={
            "content-type": content_type,
            "upsert": "false",
        },
    )

    return {
        "path": object_path,
        "result": str(result),
    }


def create_private_file_url(
    object_path: str,
    expires_in: int = 300,
) -> str:
    if not object_path or object_path.startswith("/"):
        raise ValueError("Invalid storage object path.")

    if ".." in PurePosixPath(object_path).parts:
        raise ValueError("Invalid storage object path.")

    if not 1 <= expires_in <= 3600:
        raise ValueError("Expiry must be between 1 and 3600 seconds.")

    client = get_supabase_client()

    result = client.storage.from_(
        settings.supabase_storage_bucket
    ).create_signed_url(
        object_path,
        expires_in,
    )

    signed_url = result.get("signedURL") or result.get("signedUrl")

    if not signed_url:
        raise RuntimeError("Supabase did not return a signed URL.")

    return signed_url