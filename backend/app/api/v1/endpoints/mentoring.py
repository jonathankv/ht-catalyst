from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.mentee_application import MenteeApplication
from app.schemas.mentee import (
    MenteeApplicationCreate,
    MenteeApplicationResponse,
)


router = APIRouter()


@router.post("/applications", response_model=MenteeApplicationResponse)
def create_application(
    application_in: MenteeApplicationCreate,
    db: Session = Depends(get_db),
):
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


