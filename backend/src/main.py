from brotli_asgi import BrotliMiddleware
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.database import db_lifespan
from src.routes.admin import router as admin_router
from src.routes.notes import router as notes_router

app = FastAPI(lifespan=db_lifespan)

app.add_middleware(BrotliMiddleware)
origins = ["http://localhost:3000", "http://frontend:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(notes_router)
app.include_router(admin_router)
