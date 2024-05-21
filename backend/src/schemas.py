from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


class Note(BaseModel):
    title: str = Field(min_length=10, strip_whitespace=True)
    text: str = Field(strip_whitespace=True)


class NoteDB(Note):
    id: int
    user: str
    user_id: UUID
    created_at: datetime
