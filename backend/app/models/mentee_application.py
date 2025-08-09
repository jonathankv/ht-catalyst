from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database import Base


class MenteeApplication(Base):
    __tablename__ = "mentee_applications"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True, nullable=False)
    full_name = Column(String, nullable=True)
    goals = Column(String, nullable=True)
    background = Column(String, nullable=True)
    areas = Column(String, nullable=True)
    time_commitment = Column(String, nullable=True)
    timezone = Column(String, nullable=True)
    linkedin = Column(String, nullable=True)
    github = Column(String, nullable=True)
    expectations = Column(String, nullable=True)
    status = Column(String, default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


