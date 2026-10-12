from fastapi import APIRouter, Depends, Query
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from .db import get_db
from .models import User
from .security import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/search")
def search_users(
    q: str = Query(min_length=2, max_length=80),
    current: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Find people to message. Names match partially; email must match exactly,
    so this can't be used to browse or enumerate addresses."""
    term = q.strip().lower()
    rows = db.scalars(
        select(User)
        .where(
            User.id != current.id,
            User.email_verified.is_(True),
            or_(func.lower(User.name).contains(term, autoescape=True), func.lower(User.email) == term),
        )
        .order_by(User.name.asc())
        .limit(10)
    ).all()
    return [{"id": u.id, "name": u.name, "avatar": u.avatar} for u in rows]
