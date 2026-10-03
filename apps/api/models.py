import datetime
from sqlalchemy import (
    Column, String, Text, Integer, Float, Boolean, DateTime,
    ForeignKey, Table, JSON
)
from sqlalchemy.orm import relationship
from database import Base

class Collection(Base):
    __tablename__ = "collections"
    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    rights_policy = Column(String(255), nullable=True)
    parent_id = Column(String(64), ForeignKey("collections.id"), nullable=True)

    items = relationship("Item", back_populates="collection")

class Item(Base):
    __tablename__ = "items"
    id = Column(String(64), primary_key=True, index=True)
    collection_id = Column(String(64), ForeignKey("collections.id"), nullable=True)
    type = Column(String(32), nullable=False, index=True) # book|speech|debate|manuscript|photo|audio|video|letter|article
    title = Column(String(512), nullable=False)
    title_i18n = Column(JSON, nullable=True) # {"en": "...", "hi": "...", "mr": "..."}
    creator = Column(String(255), nullable=True)
    date_start = Column(String(64), nullable=True)
    date_end = Column(String(64), nullable=True)
    date_precision = Column(String(32), default="year")
    language = Column(JSON, nullable=True) # ["en", "hi", "mr"]
    script = Column(String(64), nullable=True)
    source = Column(String(255), nullable=True)
    provenance = Column(Text, nullable=True)
    rights = Column(String(255), default="Public Domain")
    access_tier = Column(String(32), default="open") # open|onprem|restricted
    status = Column(String(32), default="published") # draft|review|published|archived
    master_uri = Column(String(512), nullable=True)
    checksum_sha256 = Column(String(64), nullable=True)
    condition_notes = Column(Text, nullable=True)
    created_by = Column(String(128), default="curator")
    version = Column(Integer, default=1)

    collection = relationship("Collection", back_populates="items")
    pages = relationship("Page", back_populates="item", cascade="all, delete-orphan")
    chunks = relationship("Chunk", back_populates="item", cascade="all, delete-orphan")
    transcripts = relationship("Transcript", back_populates="item", cascade="all, delete-orphan")
    summaries = relationship("Summary", back_populates="item", cascade="all, delete-orphan")

class Page(Base):
    __tablename__ = "pages"
    id = Column(String(64), primary_key=True, index=True)
    item_id = Column(String(64), ForeignKey("items.id"), nullable=False, index=True)
    page_no = Column(Integer, nullable=False)
    image_uri = Column(String(512), nullable=True)
    ocr_text = Column(Text, nullable=False)
    ocr_confidence = Column(Float, default=0.95)
    words = Column(JSON, nullable=True) # [{"text": "...", "bbox": [x1, y1, x2, y2], "conf": 0.98}]
    lang = Column(String(16), default="en")
    verified = Column(Boolean, default=True)

    item = relationship("Item", back_populates="pages")
    chunks = relationship("Chunk", back_populates="page", cascade="all, delete-orphan")
    translations = relationship("Translation", back_populates="page", cascade="all, delete-orphan")

class Chunk(Base):
    __tablename__ = "chunks"
    id = Column(String(64), primary_key=True, index=True)
    item_id = Column(String(64), ForeignKey("items.id"), nullable=False, index=True)
    page_id = Column(String(64), ForeignKey("pages.id"), nullable=True)
    text = Column(Text, nullable=False)
    lang = Column(String(16), default="en")
    token_count = Column(Integer, default=100)
    embedding = Column(JSON, nullable=True) # 1024-dim vector stored as list in SQLite / JSON, pgvector in Postgres
    span_start = Column(Integer, default=0)
    span_end = Column(Integer, default=0)

    item = relationship("Item", back_populates="chunks")
    page = relationship("Page", back_populates="chunks")

class Transcript(Base):
    __tablename__ = "transcripts"
    id = Column(String(64), primary_key=True, index=True)
    item_id = Column(String(64), ForeignKey("items.id"), nullable=False, index=True)
    lang = Column(String(16), default="en")
    vtt_uri = Column(String(512), nullable=True)
    segments = Column(JSON, nullable=True) # [{"start": 0.0, "end": 4.5, "text": "...", "speaker": "..."}]
    verified = Column(Boolean, default=True)

    item = relationship("Item", back_populates="transcripts")

class Translation(Base):
    __tablename__ = "translations"
    id = Column(String(64), primary_key=True, index=True)
    item_id = Column(String(64), ForeignKey("items.id"), nullable=False)
    page_id = Column(String(64), ForeignKey("pages.id"), nullable=True)
    target_lang = Column(String(16), nullable=False) # hi, mr, en
    text = Column(Text, nullable=False)
    engine = Column(String(64), default="Bhashini/IndicTrans2")
    verified = Column(Boolean, default=True)
    locked = Column(Boolean, default=False)

    page = relationship("Page", back_populates="translations")

class Summary(Base):
    __tablename__ = "summaries"
    id = Column(String(64), primary_key=True, index=True)
    item_id = Column(String(64), ForeignKey("items.id"), nullable=False, index=True)
    level = Column(String(32), default="short") # short|long|scholarly
    lang = Column(String(16), default="en")
    text = Column(Text, nullable=False)
    model = Column(String(64), default="Gemini-Archival-RAG")
    generated_at = Column(DateTime, default=datetime.datetime.utcnow)

    item = relationship("Item", back_populates="summaries")

class AudioNarration(Base):
    __tablename__ = "audio_narrations"
    id = Column(String(64), primary_key=True, index=True)
    item_id = Column(String(64), ForeignKey("items.id"), nullable=False)
    page_id = Column(String(64), ForeignKey("pages.id"), nullable=True)
    lang = Column(String(16), default="en")
    uri = Column(String(512), nullable=False)
    duration = Column(Float, default=0.0)

class Entity(Base):
    __tablename__ = "entities"
    id = Column(String(64), primary_key=True, index=True)
    type = Column(String(32), nullable=False, index=True) # person|place|org|event|work|article|concept
    name = Column(String(255), nullable=False)
    name_i18n = Column(JSON, nullable=True) # {"en": "...", "hi": "...", "mr": "..."}
    description = Column(Text, nullable=True)
    wikidata_id = Column(String(64), nullable=True)

class EntityMention(Base):
    __tablename__ = "entity_mentions"
    id = Column(Integer, primary_key=True, autoincrement=True)
    entity_id = Column(String(64), ForeignKey("entities.id"), nullable=False, index=True)
    item_id = Column(String(64), ForeignKey("items.id"), nullable=False, index=True)
    chunk_id = Column(String(64), ForeignKey("chunks.id"), nullable=True)

class EntityRelation(Base):
    __tablename__ = "entity_relations"
    id = Column(Integer, primary_key=True, autoincrement=True)
    src_id = Column(String(64), ForeignKey("entities.id"), nullable=False, index=True)
    dst_id = Column(String(64), ForeignKey("entities.id"), nullable=False, index=True)
    relation = Column(String(128), nullable=False)
    source_item_id = Column(String(64), nullable=True)
    confidence = Column(Float, default=1.0)

class TimelineEvent(Base):
    __tablename__ = "timeline_events"
    id = Column(String(64), primary_key=True, index=True)
    date = Column(String(64), nullable=False) # e.g. "1891-04-14"
    title_i18n = Column(JSON, nullable=False) # {"en": "...", "hi": "...", "mr": "..."}
    description_i18n = Column(JSON, nullable=False)
    place_id = Column(String(64), nullable=True)
    entity_ids = Column(JSON, nullable=True) # list of entity IDs
    media_item_ids = Column(JSON, nullable=True) # list of item IDs
    category = Column(String(64), nullable=False, index=True) # Education|Social Reform|Politics|Constitution|Buddhism|Legacy

class Story(Base):
    __tablename__ = "stories"
    id = Column(String(64), primary_key=True, index=True)
    slug = Column(String(128), unique=True, index=True, nullable=False)
    title_i18n = Column(JSON, nullable=False)
    blocks = Column(JSON, nullable=False) # list of rich scroll-driven story blocks
    cover_item_id = Column(String(64), nullable=True)
    status = Column(String(32), default="published")

class User(Base):
    __tablename__ = "users"
    id = Column(String(64), primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(32), default="viewer") # admin|archivist|reviewer|viewer

class CollectionUser(Base):
    __tablename__ = "collection_users"
    id = Column(String(64), primary_key=True, index=True)
    session_or_user = Column(String(128), nullable=False, index=True)
    items = Column(JSON, default=list)
    qr_token = Column(String(128), unique=True, index=True, nullable=True)
    expires_at = Column(DateTime, nullable=True)

class Kiosk(Base):
    __tablename__ = "kiosks"
    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    last_heartbeat = Column(DateTime, default=datetime.datetime.utcnow)
    content_version = Column(String(64), default="v2.6.0")
    status = Column(String(32), default="online")
    error_count = Column(Integer, default=0)

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(Integer, primary_key=True, autoincrement=True)
    actor = Column(String(128), nullable=False)
    action = Column(String(128), nullable=False)
    target = Column(String(255), nullable=True)
    ts = Column(DateTime, default=datetime.datetime.utcnow)
    meta = Column(JSON, nullable=True)

class FixityCheck(Base):
    __tablename__ = "fixity_checks"
    id = Column(Integer, primary_key=True, autoincrement=True)
    item_id = Column(String(64), ForeignKey("items.id"), nullable=False, index=True)
    checked_at = Column(DateTime, default=datetime.datetime.utcnow)
    ok = Column(Boolean, default=True)
    algorithm = Column(String(32), default="SHA-256")

class ChatMessage(Base):
    __tablename__ = "chat_messages"
    id = Column(String(64), primary_key=True, index=True)
    session_id = Column(String(128), nullable=False, index=True)
    role = Column(String(32), nullable=False) # user|assistant|system
    content = Column(Text, nullable=False)
    citations = Column(JSON, nullable=True) # list of citation objects
    feedback = Column(String(16), nullable=True) # up|down

class AnalyticsEvent(Base):
    __tablename__ = "analytics_events"
    id = Column(Integer, primary_key=True, autoincrement=True)
    kiosk_id = Column(String(64), nullable=True)
    type = Column(String(64), nullable=False) # search|view|tts|qr_export|idle_reset
    anon_session = Column(String(128), nullable=False)
    ts = Column(DateTime, default=datetime.datetime.utcnow)
    meta = Column(JSON, nullable=True)
