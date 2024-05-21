from contextlib import asynccontextmanager
from os import getenv
from typing import Annotated

from dotenv import load_dotenv
from fastapi import Depends, FastAPI
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.ext.declarative import declarative_base

load_dotenv()

engine = create_async_engine(getenv("POSTGRES_URL"))
SessionLocal = async_sessionmaker(engine)
Base = declarative_base()


async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        await db.close()


@asynccontextmanager
async def db_lifespan(_: FastAPI):
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)

    print("Connected to database.")

    yield


DatabaseDependency = Annotated[AsyncSession, Depends(get_db)]
