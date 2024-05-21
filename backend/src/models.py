from sqlalchemy import UUID, CheckConstraint, Column, DateTime, Integer, String, Text
from sqlalchemy.sql import func

from src.database import Base


class Notes(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    user_id = Column(UUID, index=True)
    user = Column(String(255))
    title = Column(String(100), CheckConstraint("length(title) > 10"))
    text = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
