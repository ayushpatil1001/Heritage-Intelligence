from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
import datetime

class CollectionBase(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    rights_policy: Optional[str] = None
    parent_id: Optional[str] = None

class ItemBase(BaseModel):
    id: str
    collection_id: Optional[str] = None
    type: str
    title: str
    title_i18n: Optional[Dict[str, str]] = None
    creator: Optional[str] = None
    date_start: Optional[str] = None
    date_end: Optional[str] = None
    date_precision: Optional[str] = "year"
    language: Optional[List[str]] = None
    script: Optional[str] = None
    source: Optional[str] = None
    provenance: Optional[str] = None
    rights: Optional[str] = "Public Domain"
    access_tier: Optional[str] = "open"
    status: Optional[str] = "published"
    master_uri: Optional[str] = None
    checksum_sha256: Optional[str] = None
    condition_notes: Optional[str] = None
    created_by: Optional[str] = "curator"
    version: Optional[int] = 1

    class Config:
        from_attributes = True

class PageBase(BaseModel):
    id: str
    item_id: str
    page_no: int
    image_uri: Optional[str] = None
    ocr_text: str
    ocr_confidence: Optional[float] = 0.95
    words: Optional[List[Dict[str, Any]]] = None
    lang: Optional[str] = "en"
    verified: Optional[bool] = True

    class Config:
        from_attributes = True

class SummaryBase(BaseModel):
    id: str
    item_id: str
    level: str
    lang: str
    text: str
    model: str
    generated_at: Optional[datetime.datetime] = None

    class Config:
        from_attributes = True

class EntityBase(BaseModel):
    id: str
    type: str
    name: str
    name_i18n: Optional[Dict[str, str]] = None
    description: Optional[str] = None
    wikidata_id: Optional[str] = None

    class Config:
        from_attributes = True

class TimelineEventBase(BaseModel):
    id: str
    date: str
    title_i18n: Dict[str, str]
    description_i18n: Dict[str, str]
    place_id: Optional[str] = None
    entity_ids: Optional[List[str]] = None
    media_item_ids: Optional[List[str]] = None
    category: str

    class Config:
        from_attributes = True

class StoryBase(BaseModel):
    id: str
    slug: str
    title_i18n: Dict[str, str]
    blocks: List[Dict[str, Any]]
    cover_item_id: Optional[str] = None
    status: Optional[str] = "published"

    class Config:
        from_attributes = True

class SearchResult(BaseModel):
    id: str
    item_id: str
    type: str
    title: str
    title_i18n: Optional[Dict[str, str]] = None
    snippet: str
    source: str
    date: str
    page_no: Optional[int] = 1
    score: float
    access_tier: str = "open"

class ChatRequest(BaseModel):
    messages: List[Dict[str, str]]
    lang: Optional[str] = "en"
    mode: Optional[str] = "scholarly" # explain_simply | scholarly

class Citation(BaseModel):
    source_id: str
    title: str
    volume: str
    page: int
    paragraph: int
    quote: str
    deep_link: str

class ChatResponse(BaseModel):
    answer: str
    citations: List[Citation]
    verified: bool
    mode: str
    language: str

class QuoteVerifyRequest(BaseModel):
    text: str
    lang: Optional[str] = "en"

class QuoteVerifyResponse(BaseModel):
    status: str # "Verified" | "Similar passage found" | "Not found"
    similarity: float
    source: Optional[str] = None
    matched_quote: Optional[str] = None
    citation: Optional[Dict[str, Any]] = None
    note: Optional[str] = None

class HeartbeatRequest(BaseModel):
    content_version: str
    error_count: Optional[int] = 0
    status: Optional[str] = "online"
