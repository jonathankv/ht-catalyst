from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.subscriber import Subscriber
from pydantic import BaseModel, EmailStr
from starlette.concurrency import run_in_threadpool
import re

router = APIRouter()

class SubscribeRequest(BaseModel):
    email: EmailStr

def is_valid_email(email: str) -> bool:
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

@router.post("/subscribe", response_model=dict)
async def subscribe(request: SubscribeRequest, db: Session = Depends(get_db)):
    if not is_valid_email(request.email):
        raise HTTPException(status_code=400, detail="Invalid email format")

    # Execute blocking DB operations in a threadpool to avoid blocking the event loop
    def upsert_subscription():
        existing_subscriber = (
            db.query(Subscriber)
            .filter(Subscriber.email == request.email)
            .first()
        )
        if existing_subscriber:
            if existing_subscriber.is_active:
                return "Email already subscribed", False
            existing_subscriber.is_active = True
            db.commit()
            return "Subscription reactivated successfully", True

        new_subscriber = Subscriber(email=request.email)
        db.add(new_subscriber)
        try:
            db.commit()
            return "Subscribed successfully", True
        except Exception:
            db.rollback()
            raise

    try:
        message, changed = await run_in_threadpool(upsert_subscription)
        if not changed and message == "Email already subscribed":
            raise HTTPException(status_code=400, detail=message)
        return {"message": message}
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to subscribe. Please try again.")