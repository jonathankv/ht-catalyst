from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


class MenteeApplicationBase(BaseModel):
    user_email: EmailStr
    full_name: Optional[str] = None
    goals: Optional[str] = None
    background: Optional[str] = None
    areas: Optional[str] = None
    time_commitment: Optional[str] = None
    timezone: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    expectations: Optional[str] = None


class MenteeApplicationCreate(MenteeApplicationBase):
    pass


class MenteeApplicationUpdate(BaseModel):
    full_name: Optional[str] = None
    goals: Optional[str] = None
    background: Optional[str] = None
    areas: Optional[str] = None
    time_commitment: Optional[str] = None
    timezone: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    expectations: Optional[str] = None
    status: Optional[str] = Field(default=None, description="pending|accepted|rejected")


class MenteeApplicationInDBBase(MenteeApplicationBase):
    id: int
    status: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class MenteeApplicationResponse(MenteeApplicationInDBBase):
    pass


