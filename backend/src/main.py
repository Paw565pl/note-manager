from fastapi import FastAPI

from src.database import db_lifespan

app = FastAPI(lifespan=db_lifespan)
