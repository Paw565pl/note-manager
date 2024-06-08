from fastapi import APIRouter, HTTPException, status
from sqlalchemy import and_, delete, select

from src.auth import AuthTokenDependency
from src.database import DatabaseDependency
from src.models import Notes
from src.schemas import Note, NotePayload

router = APIRouter(prefix="/api/notes")


@router.get("/")
async def get_user_notes(
    token_info: AuthTokenDependency, db: DatabaseDependency
) -> list[Note]:
    user_id = token_info.get("sub")

    query = (
        select(Notes).where(Notes.user_id == user_id).order_by(Notes.created_at.desc())
    )
    result = await db.execute(query)
    user_notes = result.scalars().all()

    return user_notes


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_note(
    note: NotePayload, token_info: AuthTokenDependency, db: DatabaseDependency
) -> Note:
    user_id = token_info.get("sub")
    user = token_info.get("preferred_username")
    note_dict = note.model_dump()

    new_note = Notes(user_id=user_id, user=user, **note_dict)
    db.add(new_note)
    await db.commit()
    await db.refresh(new_note)

    return new_note


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user_note(
    id: int, token_info: AuthTokenDependency, db: DatabaseDependency
) -> None:
    user_id = token_info.get("sub")

    query = delete(Notes).where(and_(Notes.user_id == user_id, Notes.id == id))
    result = await db.execute(query)
    await db.commit()

    deleted_rows = result.rowcount
    if deleted_rows == 0:
        raise HTTPException(status.HTTP_404_NOT_FOUND)

    return None
