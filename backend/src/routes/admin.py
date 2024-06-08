from fastapi import APIRouter, HTTPException, status
from sqlalchemy import delete, select

from src.auth import AdminRoleDependency
from src.database import DatabaseDependency
from src.models import Notes
from src.schemas import Note

router = APIRouter(prefix="/api/admin")


@router.get("/")
async def get_all_notes(_: AdminRoleDependency, db: DatabaseDependency) -> list[Note]:
    query = select(Notes).order_by(Notes.created_at.desc())
    result = await db.execute(query)
    all_notes = result.scalars().all()

    return all_notes


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_any_note(
    id: int, _: AdminRoleDependency, db: DatabaseDependency
) -> None:
    query = delete(Notes).where(Notes.id == id)
    result = await db.execute(query)
    await db.commit()

    deleted_rows = result.rowcount
    if deleted_rows == 0:
        raise HTTPException(status.HTTP_404_NOT_FOUND)

    return None
