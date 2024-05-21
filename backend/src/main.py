from fastapi import FastAPI

from src.database import db_lifespan
from src.routes.admin import router as admin_router
from src.routes.notes import router as notes_router

app = FastAPI(lifespan=db_lifespan)

app.include_router(notes_router)
app.include_router(admin_router)
