# Ambedkar Heritage Intelligence & Kiosk System (AHI-KS)
## Technical Requirements Document (TRD)

---

### 1. Architectural Architecture & Topology
The system is built as a high-performance, modular monorepo consisting of:
* **Web & Kiosk Frontend (`apps/web`):** Next.js 14 App Router, TypeScript (strict mode), Tailwind CSS, Framer Motion, `@/context/AppContext` for global state (language, high contrast, kiosk idle timer, personal collection).
* **Core API Backend (`apps/api`):** Python 3.11+, FastAPI, SQLAlchemy ORM (compatible with PostgreSQL 16 + pgvector and local SQLite fallback), Pydantic v2 schemas.
* **AI Microservice (`apps/ai-service`):** FastAPI microservice managing IndicTrans2 multilingual translation, deterministic local embeddings (384-dim), semantic similarity, and dual-mode Gemini LLM orchestration (`AI_MODE=mock` / `AI_MODE=live`).
* **Evaluation Framework (`data/eval`):** RAG benchmark suite measuring retrieval precision, recall, and 100% citation grounding.

```
       +-------------------------------------------------------------+
       |               Client Surfaces (Next.js 14 App)               |
       |  - Kiosk (1080x1920)   - Display Wall (1920x1080)           |
       |  - Public Web Portal    - Archivist Management Console       |
       +------------------------------+------------------------------+
                                      | HTTP / REST / WebSpeech
                                      v
       +-------------------------------------------------------------+
       |                  FastAPI Core API Gateway                    |
       |             (port 8000 / apps/api/main.py)                  |
       +--------------+-------------------------------+--------------+
                      |                               |
                      v                               v
       +------------------------------+  +---------------------------+
       |       AI Microservice        |  |  PostgreSQL 16 + pgvector |
       | (port 8001 / apps/ai-service)|  |  21 Relational Tables     |
       | - Deterministic Embeddings   |  |  - Full Text tsvector     |
       | - IndicTrans2 Dictionary     |  |  - Hybrid RRF Ranker      |
       | - Mock / Live Gemini Engine  |  |  - SHA-256 PREMIS Fixity  |
       +------------------------------+  +---------------------------+
```

---

### 2. Database Schema (21 Relational Tables)
The system data layer maps to the 21 models defined in `apps/api/models.py`:
1. `collections`: Archival collections and series (e.g. BAWS, CAD, Correspondence).
2. `items`: Individual archival volumes, speeches, or documents with Dublin Core metadata.
3. `pages`: Page-level assets with facsimile URI, page number, and OCR text.
4. `chunks`: 500-token semantic chunks with 384-dimensional vector embeddings and citations.
5. `transcripts`: Audio/video time-aligned WebVTT transcripts with sentence-level timestamps.
6. `translations`: Precomputed and dynamic Indic translations (English, Hindi, Marathi).
7. `summaries`: Scholarly and youth-accessible executive summaries.
8. `audio_narrations`: Text-to-speech synthesized audio files.
9. `entities`: Named entities (Person, Place, Organization, Legislation, Concept, Work).
10. `entity_mentions`: Occurrences of entities within specific chunks and page scans.
11. `entity_relations`: Directed semantic knowledge graph edges between entities.
12. `timeline_events`: Chronological milestones (1891–1956) with geographic and thematic tags.
13. `stories`: Curated exhibition visual narratives with structured scrollytelling chapters.
14. `users`: System users and curators with role-based access control.
15. `collection_users`: Association table linking users to personal binders.
16. `kiosks`: Hardware fleet registry with heartbeat, battery telemetry, and active viewports.
17. `audit_logs`: Immutable log of archivist actions, metadata updates, and OCR overrides.
18. `fixity_checks`: Automated cryptographic SHA-256 checksum logs for PREMIS 3.0 compliance.
19. `chat_messages`: Multi-turn conversational research history with grounded citations.
20. `analytics_events`: Anonymous interaction telemetry (searches, queries, reader dwell time).
21. `saved_items`: Personal collection binder bookmarks with 7-day ephemeral tokens.

---

### 3. Cross-Lingual Hybrid Search & Retrieval (RAG)
1. **Hybrid Retrieval Pipeline:**
   - **Dense Retrieval:** Vector cosine similarity on 384-dimensional embeddings stored in `pgvector`.
   - **Sparse Retrieval:** PostgreSQL `tsvector` / BM25 inverted index query with English, Hindi, and Marathi stopword stemming.
   - **Reciprocal Rank Fusion (RRF):** Merges dense and sparse ranks with constant $k=60$:
     $$RRF(d) = \sum_{m \in M} \frac{1}{60 + r_m(d)}$$
2. **Strict Grounding Contract:**
   - Generative answers must include `citations: [{ source_id, document_title, volume, page_number, excerpt }]`.
   - If maximum retrieval similarity score is below threshold $\tau = 0.55$, the engine returns a strict unverified fallback:
     *"The archive does not contain authenticated records confirming this statement."*

---

### 4. API Endpoints (`/api/v1`)
* `GET /api/v1/search?q=&lang=&category=` — Hybrid semantic & keyword search.
* `GET /api/v1/items/{id}` — Item metadata and Dublin Core fields.
* `GET /api/v1/items/{id}/pages/{page_num}` — Page scan URI, OCR text, and bounding boxes.
* `GET /api/v1/items/{id}/summary` — Contextual summary.
* `GET /api/v1/items/{id}/translation?target_lang=` — IndicTrans2 translated text.
* `GET /api/v1/timeline` — Chronological milestones (1891–1956).
* `GET /api/v1/stories` — Curated scroll-driven stories.
* `GET /api/v1/graph` — Semantic knowledge graph nodes and edges.
* `POST /api/v1/assistant/chat` — Grounded RAG conversational research assistant.
* `POST /api/v1/quotes/verify` — Semantic quotation authentication verifier.
* `POST /api/v1/kiosks/{id}/heartbeat` — Kiosk hardware telemetry and screen status.
* `POST /api/v1/admin/ingest` — Document upload and SHA-256 fixity calculation.
* `GET /api/v1/admin/fixity` — PREMIS fixity audit log.
