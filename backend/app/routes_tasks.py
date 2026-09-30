from datetime import datetime, timezone
import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from .audit import append_audit
from .db import get_db
from .models import User
from .security import get_current_user, new_id
from .schemas import TaskCreateIn, TaskUpdateIn
from .models import Task

router = APIRouter(prefix="/tasks", tags=["Tasks"])

def task_out(t: Task):
    return {
        "id": t.id, "title": t.title, "description": t.description,
        "priority": t.priority, "status": t.status, "assignee": t.assignee,
        "dueDate": t.due_date, "progress": t.progress,
        "labels": json.loads(t.labels_json or "[]"),
    }

@router.get("")
def list_tasks(current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    rows = db.scalars(select(Task).where(Task.user_id == current.id).order_by(Task.created_at.desc())).all()
    return [task_out(t) for t in rows]

@router.post("")
def create_task(payload: TaskCreateIn, current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    t = Task(id=new_id(), user_id=current.id, title=payload.title.strip(), description=payload.description.strip(), priority=payload.priority, status=payload.status, assignee=payload.assignee or current.name, due_date=payload.due_date, progress=payload.progress, labels_json=json.dumps(payload.labels))
    db.add(t); db.commit(); db.refresh(t)
    append_audit(db, current.id, "task.created", {"task_id": t.id})
    return task_out(t)

@router.patch("/{task_id}")
def update_task(task_id: str, payload: TaskUpdateIn, current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    t = db.scalar(select(Task).where(Task.id == task_id, Task.user_id == current.id))
    if not t: raise HTTPException(404, "Task not found")
    for field in ("title", "description", "priority", "status", "assignee", "due_date", "progress"):
        value = getattr(payload, field)
        if value is not None: setattr(t, field, value)
    if payload.labels is not None: t.labels_json = json.dumps(payload.labels)
    db.commit(); db.refresh(t)
    append_audit(db, current.id, "task.updated", {"task_id": t.id})
    return task_out(t)

@router.delete("/{task_id}")
def delete_task(task_id: str, current: User = Depends(get_current_user), db: Session = Depends(get_db)):
    t = db.scalar(select(Task).where(Task.id == task_id, Task.user_id == current.id))
    if not t: raise HTTPException(404, "Task not found")
    db.delete(t); db.commit()
    append_audit(db, current.id, "task.deleted", {"task_id": task_id})
    return {"ok": True}
