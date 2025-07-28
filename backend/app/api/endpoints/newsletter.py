from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.subscriber import Subscriber
from pydantic import BaseModel, EmailStr
import re

router = APIRouter()

class SubscribeRequest(BaseModel):
    email: EmailStr

def is_valid_email(email: str) -> bool:
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

@router.post("/subscribe")
async def subscribe(request: SubscribeRequest, db: Session = Depends(get_db)):
    if not is_valid_email(request.email):
        raise HTTPException(status_code=400, detail="Invalid email format")

    # Check if email already exists
    existing_subscriber = db.query(Subscriber).filter(Subscriber.email == request.email).first()
    if existing_subscriber:
        if existing_subscriber.is_active:
            raise HTTPException(status_code=400, detail="Email already subscribed")
        else:
            # Reactivate subscription
            existing_subscriber.is_active = True
            db.commit()
            return {"message": "Subscription reactivated successfully"}

    # Create new subscriber
    new_subscriber = Subscriber(email=request.email)
    db.add(new_subscriber)
    
    try:
        db.commit()
        return {"message": "Subscribed successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to subscribe. Please try again.") 