<div align="center">

![AHI-KS Banner](docs/screenshots/og_image_1200x630.png)

# Ambedkar Heritage Intelligence & Kiosk System (AHI-KS)
**Smart India Hackathon 2026 — Problem Statement ID 26096**

*AI-powered Digital Heritage Archive for Dr. B. R. Ambedkar with Interactive Kiosk, Web Portal, Grand Display Wall, and Archivist Console.*

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16_pgvector-336791?logo=postgresql)](https://github.com/pgvector/pgvector)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![WCAG](https://img.shields.io/badge/Accessibility-WCAG_2.1_AAA-green.svg)](https://www.w3.org/WAI/standards-guidelines/wcag/)

</div>

---

## ✨ Features at a Glance

| 🌐 **Cross-Lingual Search** | 📖 **Deep Zoom Reader** | 🤖 **AI Assistant** |
| :---: | :---: | :---: |
| <img src="docs/screenshots/desktop_home_1920x1080.png" width="250"> | <img src="docs/screenshots/reader_split_view.png" width="250"> | <img src="docs/screenshots/ai_assistant.png" width="250"> |
| Multi-lingual hybrid search (EN, HI, MR) with faceted filtering. | Side-by-side facsimile and digitized text with TTS audio. | Strictly grounded RAG assistant with verified citations. |

| 🕸️ **Knowledge Graph** | 🏛️ **Kiosk Interface** | ⚙️ **Archivist Console** |
| :---: | :---: | :---: |
| <img src="docs/screenshots/knowledge_graph.png" width="250"> | <img src="docs/screenshots/kiosk_surface_1080x1920.png" width="250"> | <img src="docs/screenshots/archivist_console.png" width="250"> |
| Interactive SVG timeline and entity relationship graph. | Touch-first accessible interface with 60s privacy wipe. | OCR correction, Dublin Core metadata, and fleet monitoring. |

---

## 🏛️ System Architecture

<details>
<summary><b>Click to view Architecture Diagram</b></summary>

```mermaid
graph TD
    subgraph Client Surfaces [Client Surfaces]
        Kiosk["Museum Kiosk (1080x1920 Portrait)<br/>• Attract Loop & Virtual Keyboard<br/>• 60s/90s Idle Guard & Privacy Wipe"]
        Display["Grand Display Wall (1920x1080)<br/>• Ambient Cycling Quote Cards<br/>• Live Counters & Phone Handover QR"]
        WebPortal["Public Research Portal<br/>• Cross-lingual Search & Split Reader<br/>• Timeline & Knowledge Graph"]
        AdminConsole["Archivist Console<br/>• OCR Confidence Heatmap & Ingest<br/>• Dublin Core & PREMIS Fixity Audit"]
    end

    subgraph API Gateway & Core Backend [Core Services :8000]
        FastAPIGateway["FastAPI Core Gateway<br/>/api/v1/search, /items, /timeline, /kiosks"]
        RRF["Hybrid Search Ranker<br/>(Dense Cosine + Sparse BM25 RRF)"]
        SessionMgr["Kiosk Telemetry & Session Mgr"]
    end

    subgraph AI Microservice [AI Service :8001]
        Embeddings["Local 384-dim Deterministic Embeddings"]
        IndicTrans["IndicTrans2 Dictionary (en, hi, mr)"]
        GroundedRAG["Grounded RAG Engine<br/>AI_MODE=mock | live Gemini 1.5 Pro"]
        QuoteVerifier["Semantic Quote Matcher & Verifier"]
    end

    subgraph Data & Storage Layer
        PostgreSQL[("PostgreSQL 16 + pgvector<br/>21 Relational Tables<br/>Full-text tsvector indexes")]
        MinIO[("MinIO S3 Object Store<br/>TIFF, PDF/A-1b Scans & Audio")]
        RedisCache[("Redis 7 Cache<br/>Rate Limiting & Session Token Store")]
    end

    Client Surfaces -->|HTTP / REST| FastAPIGateway
    FastAPIGateway --> RRF
    FastAPIGateway --> SessionMgr
    FastAPIGateway --> PostgreSQL
    FastAPIGateway --> MinIO
    FastAPIGateway --> RedisCache

    FastAPIGateway <-->|Internal RPC| AIMicroservice
    AI Microservice --> Embeddings
    AI Microservice --> IndicTrans
    AI Microservice --> GroundedRAG
    AI Microservice --> QuoteVerifier
```
</details>

---

## 🛡️ Hard Historical Guardrails & Ethics

> **We treat history with the reverence it deserves. The system is designed with strict boundaries to prevent misinformation.**

1. 🚫 **Zero Invented Facts or Synthetic Quotes:** All quotations, legal clauses, and historical statements are exclusively drawn from *Dr. Babasaheb Ambedkar: Writings and Speeches (BAWS Vols. 1–22)* and *Constituent Assembly Debates (CAD)*.
2. 🔗 **Strict Grounding:** Every response from the Archival AI Assistant includes verified primary source bracketed citations (e.g., `[S1] BAWS Vol. 1, p. 25`). Unverified queries yield an explicit fallback: *"The archive does not contain authenticated records confirming this statement."*
3. 👤 **No AI Deepfakes or Personas:** The archive never generates synthetic likenesses, deepfake avatars, or impersonations of real historical figures. Dr. Ambedkar's authentic voice and photographs are preserved untouched.
4. 🔌 **Mock by Default:** The app runs out-of-the-box in `AI_MODE=mock` without requiring external paid API keys or cloud dependencies.

---

## 🚀 Quick Start & Setup Instructions

### Prerequisites
- Node.js 18+ & npm
- Python 3.10+
- *(Optional)* Docker & Docker Compose

### Option A: Local Standalone Execution (Fastest)

**1. Clone & install backend dependencies:**
```bash
git clone https://github.com/ayushpatil1001/Heritage-Intelligence.git
cd Heritage-Intelligence
pip install -r apps/api/requirements.txt
pip install -r apps/ai-service/requirements.txt
```

**2. Generate Seed Database:** *(Creates 30 primary items, 25 timeline events, 4 stories, 40 entities)*
```bash
python apps/api/seed_generator.py
python apps/api/seed_runner.py
```

**3. Start Core API (Port 8000) & AI Microservice (Port 8001):**
```bash
# Terminal 1: Core API
python -m uvicorn apps.api.main:app --host 127.0.0.1 --port 8000

# Terminal 2: AI Microservice
python -m uvicorn apps.ai-service.main:app --host 127.0.0.1 --port 8001
```

**4. Install & Run Frontend Web Application (Port 3000):**
```bash
# Terminal 3: Web App
cd apps/web
npm install
npm run dev
```

**5. Visit [http://localhost:3000](http://localhost:3000)** in your browser! 🎉

<details>
<summary><b>Option B: Full Docker Compose Deployment</b></summary>

```bash
cp .env.example .env
docker compose up -d --build
```
Services will launch automatically:
- **Frontend:** `http://localhost:3000`
- **API Gateway:** `http://localhost:8000/docs`
- **AI Microservice:** `http://localhost:8001/docs`
- **MinIO S3 Console:** `http://localhost:9001`
- **Grafana Dashboards:** `http://localhost:3001`
</details>

---

## 🎬 5-Minute Evaluator & Judge Demo Script

| Time | Area & Screenshot | Action & Key Feature to Highlight |
|:---:|---|---|
| **0:00 - 1:00** | **Home & Cross-Lingual Search**<br/>`http://localhost:3000`<br/><br/><img src="docs/screenshots/desktop_home_1920x1080.png" width="200"> | **1.** Toggle language between **English**, **हिन्दी**, and **मराठी**.<br/>**2.** Open Search (`/search`), type *"social democracy"* or click the microphone.<br/>**3.** Observe sub-second hybrid retrieval with facet filters. |
| **1:00 - 2:00** | **Deep Zoom & Split Reader**<br/>`/reader/item-001`<br/><br/><img src="docs/screenshots/reader_split_view.png" width="200"> | **1.** View side-by-side facsimile scan and clean digitized text.<br/>**2.** Click **Zoom In (+)** to inspect high-resolution archival scans.<br/>**3.** Switch translation tabs (**Hindi / Marathi**).<br/>**4.** Click **Listen Audio** and **Copy Scholarly Citation**. |
| **2:00 - 3:00** | **AI Assistant & Quote Verifier**<br/>`/assistant`<br/><br/><img src="docs/screenshots/ai_assistant.png" width="200"> | **1.** Prompt: *"What was Dr. Ambedkar's argument on caste mechanism at Columbia?"*<br/>**2.** Inspect strictly grounded response with clickable citation cards (`[S1]`).<br/>**3.** Test Quote Verifier (`/quotes/verify`) to see instant **Verified Authenticated** status. |
| **3:00 - 4:00** | **Timeline, Knowledge Graph & Map**<br/>`/graph`<br/><br/><img src="docs/screenshots/knowledge_graph.png" width="200"> | **1.** Browse interactive timeline (1891–1956) with category filtering.<br/>**2.** Explore SVG Knowledge Graph (Dr. Ambedkar, Columbia University, Poona Pact).<br/>**3.** Open Historical Map to view geospatial coordinates (Mahad, New York, London). |
| **4:00 - 4:30** | **Museum Kiosk & Display Wall**<br/>`/kiosk`<br/><br/><img src="docs/screenshots/kiosk_surface_1080x1920.png" width="200"> | **1.** Visit `/kiosk` (1080×1920): observe 64px+ touch targets, attract quote loop.<br/>**2.** Test virtual touch keyboard and 60s idle countdown privacy wipe.<br/>**3.** Visit `/display` (1920×1080): ambient exhibition mode with visitor counters. |
| **4:30 - 5:00** | **Archivist Console**<br/>`/admin`<br/><br/><img src="docs/screenshots/archivist_console.png" width="200"> | **1.** Inspect Ingest Queue with automated SHA-256 fixity hashes.<br/>**2.** Inspect OCR Confidence Heatmap with human-in-the-loop correction UI.<br/>**3.** Review Dublin Core 15 metadata editor and real-time Kiosk Fleet monitoring. |

---

## 🖥️ Kiosk Hardware & Deployment Specifications

### Physical Hardware Recommendation
* **Display:** 43" to 55" Commercial Grade LED Panel, 1080×1920 Portrait orientation, 500+ nits brightness, anti-glare tempered glass.
* **Touch Sensor:** Projected Capacitive (PCAP) 10-point multi-touch with minimum 10ms touch response.
* **Compute Unit:** Intel Core i5 / i7 Mini PC (or Raspberry Pi 5 8GB for budget deployments), 16GB RAM, 256GB NVMe SSD.
* **Operating System:** Ubuntu Core 24.04 LTS or Windows 11 Enterprise LTSC in Dedicated Single-App Kiosk Mode.

### Software & Browser Lockdown
* **Browser Execution:** Chromium running in strict kiosk mode:
  ```bash
  chromium-browser \
    --kiosk \
    --noerrdialogs \
    --disable-infobars \
    --disable-pinch \
    --overscroll-history-navigation=0 \
    --check-for-update-interval=31536000 \
    --app=http://localhost:3000/kiosk
  ```
* **Session Privacy & Idle Guard:** 
  * 60 seconds of touch inactivity triggers a 30-second warning modal with an audible prompt.
  * At 90 seconds, local state, search history, and personal collections are scrubbed, resetting to the attract screen.
* **Virtual On-Screen Keyboard:** Integrated touch keyboard with full English QWERTY and Devanagari layouts for accessible touch search without external hardware.
* **Hardware Telemetry:** Background periodic heartbeat sent to `/api/v1/kiosks/{id}/heartbeat` tracking uptime, battery/power, and screen state.

---

## 📁 Project Monorepo Structure

```text
├── apps/
│   ├── web/                    # Next.js 14 App Router (Web, Kiosk, Display, Admin)
│   ├── api/                    # FastAPI Core Gateway & Relational Data Layer
│   ├── ai-service/             # FastAPI Indic AI, Embeddings & RAG Service
│   └── worker/                 # Celery Async Processing Pipeline
├── data/
│   ├── seed/                   # 30 Primary items, 25 timeline milestones, 4 stories
│   └── eval/                   # RAG Grounding & Retrieval Benchmark Suite
├── docs/
│   ├── PRD.md                  # Comprehensive Product Requirements Document
│   ├── TRD.md                  # Technical Requirements & Database Schema
│   └── adrs/                   # Architecture Decision Records (ADR-001, ADR-002)
├── infra/
│   ├── nginx/                  # Reverse Proxy & SSL Termination
│   └── grafana/                # Production Monitoring Dashboards
├── docker-compose.yml          # Containerized Orchestration Suite
├── Makefile                    # Developer CLI Automation Commands
└── README.md                   # System Documentation & Evaluator Walkthrough
```

---

## 📜 License & Acknowledgements

Developed for **Smart India Hackathon 2026** under Problem Statement 26096.  

*Primary archival texts and source facsimiles derived from Dr. Babasaheb Ambedkar: Writings and Speeches (BAWS), published by the Dr. Ambedkar Foundation, Ministry of Social Justice and Empowerment, Government of India, and the Constituent Assembly Debates (CAD), Government of India.*
