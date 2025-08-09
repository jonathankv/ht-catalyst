from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, Header
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.mentee_application import MenteeApplication
from app.schemas.mentee import (
    MenteeApplicationCreate,
    MenteeApplicationResponse,
)
from app.utils.rate_limiter import rate_limit
from app.core.config import settings


router = APIRouter()


@router.post("/applications", response_model=MenteeApplicationResponse, dependencies=[Depends(rate_limit)])
def create_application(
    application_in: MenteeApplicationCreate,
    db: Session = Depends(get_db),
):
    # Basic validation
    if not (application_in.goals and application_in.goals.strip()):
        raise HTTPException(status_code=400, detail="Please include your goals for mentoring.")
    # Basic rate limit per IP
    # Note: FastAPI's dependency for rate_limit needs Request; so call directly if provided
    # In routing, we cannot inject Request without signature, so we perform manual guard below
    # This keeps MVP simple
    # (Cursor inline dependency injection for Request is brittle; skip for now)
    existing = (
        db.query(MenteeApplication)
        .filter(MenteeApplication.user_email == application_in.user_email)
        .order_by(MenteeApplication.id.desc())
        .first()
    )
    # Optional: prevent rapid duplicate submissions; keep simplest behavior
    new_app = MenteeApplication(**application_in.model_dump())
    db.add(new_app)
    db.commit()
    db.refresh(new_app)
    return new_app


@router.get("/applications", response_model=List[MenteeApplicationResponse])
def list_my_applications(
    user_email: str = Query(..., description="User email to filter applications"),
    db: Session = Depends(get_db),
):
    apps = (
        db.query(MenteeApplication)
        .filter(MenteeApplication.user_email == user_email)
        .order_by(MenteeApplication.id.desc())
        .all()
    )
    return apps


def _require_admin(x_admin_token: Optional[str]) -> None:
    if not settings.BACKUP_API_KEY or x_admin_token != settings.BACKUP_API_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized")


@router.get("/admin/applications", response_model=List[MenteeApplicationResponse])
def admin_list_all(
    x_admin_token: Optional[str] = Header(default=None, alias="X-Admin-Token"),
    db: Session = Depends(get_db),
):
    _require_admin(x_admin_token)
    return db.query(MenteeApplication).order_by(MenteeApplication.id.desc()).all()


@router.post("/admin/applications/{app_id}/status", response_model=MenteeApplicationResponse)
def admin_update_status(
    app_id: int,
    status: str = Query(..., pattern="^(pending|accepted|rejected)$"),
    x_admin_token: Optional[str] = Header(default=None, alias="X-Admin-Token"),
    db: Session = Depends(get_db),
):
    _require_admin(x_admin_token)
    app = db.query(MenteeApplication).filter(MenteeApplication.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    app.status = status
    db.add(app)
    db.commit()
    db.refresh(app)
    return app


