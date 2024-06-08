from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


class NotePayload(BaseModel):
    title: str = Field(min_length=10, max_length=100, strip_whitespace=True)
    text: str = Field(strip_whitespace=True)


class Note(NotePayload):
    id: int
    user: str
    user_id: UUID
    created_at: datetime
