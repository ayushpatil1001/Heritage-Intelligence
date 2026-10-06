import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

import shutil

base_dir = os.path.dirname(os.path.abspath(__file__))
bundled_db_path = os.path.join(base_dir, "ambedkarverse.db")
is_serverless = bool(os.environ.get("VERCEL") or os.environ.get("AWS_LAMBDA_FUNCTION_NAME"))

if is_serverless:
    tmp_db_path = "/tmp/ambedkarverse.db"
    if not os.path.exists(tmp_db_path):
        if os.path.exists(bundled_db_path):
            try:
                shutil.copy2(bundled_db_path, tmp_db_path)
            except Exception as e:
                print(f"Error copying DB to /tmp: {e}")
    DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{tmp_db_path}")
else:
    if os.path.exists(bundled_db_path):
        DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{bundled_db_path}")
    else:
        DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./ambedkarverse.db")

connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
