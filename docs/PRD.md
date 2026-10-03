# Ambedkar Heritage Intelligence & Kiosk System (AHI-KS)
## Product Requirements Document (PRD)

**Problem Statement:** Smart India Hackathon 2026 — PS ID 26096  
**Title:** AI-Powered Digital Heritage Archive for Dr. B. R. Ambedkar  
**Target Surfaces:** Interactive Museum Kiosk (1080×1920 portrait), Web Research Portal (responsive), Grand Display Wall (1920×1080 landscape), Archivist Console.

---

### 1. Executive Summary & Vision
The **Ambedkar Heritage Intelligence & Kiosk System (AHI-KS)** is a national-grade digital heritage archive, interactive museum kiosk, and AI research assistant dedicated to the life, writings, speeches, and philosophy of **Dr. Bhimrao Ramji Ambedkar**. 

The system unifies 22 volumes of *Dr. Babasaheb Ambedkar: Writings and Speeches (BAWS)*, Constituent Assembly Debates (CAD), legislative speeches, audio recordings, historical photographs, and correspondence into an authoritative, multi-lingual, cross-searchable digital repository.

---

### 2. Core Pillars & Hard Historical Guardrails
1. **Zero Hallucination / Zero Invented Facts:** Historical facts, dates, legal clauses, or quotations are strictly drawn from authentic, cited primary sources.
2. **Strict Grounding:** Every generative answer in the Archival Assistant must explicitly cite source volumes and page numbers (e.g. `[S1] BAWS Vol. 1, p. 25`). Unverified queries trigger an explicit graceful fallback ("This assertion cannot be found in authentic records").
3. **No Deepfakes or AI Personas:** Dr. Ambedkar's likeness and voice are preserved through verified archival media only. Generative AI is strictly restricted to semantic search, cross-lingual translation, summarization, and query resolution.
4. **Offline Resilience:** Museum kiosks run reliably on cached local SQLite/PostgreSQL seed data when connectivity is degraded.

---

### 3. User Personas
* **Museum Visitor (Kiosk & Wall):** General public and students exploring interactive displays, timeline milestones, audiovisual speeches, and saving items to their phone via a 7-day QR token.
* **Academic Scholar / Legal Researcher (Web Portal):** Advanced users conducting multilingual semantic queries, inspecting high-resolution facsimile scans, verifying quotations, and exporting citations.
* **Archivist / Museum Curator (Console):** Ingesting new scans, reviewing OCR confidence heatmaps, editing Dublin Core and PREMIS 3.0 metadata, monitoring fixity checksums, and overseeing the kiosk fleet.

---

### 4. Functional Specifications

| Feature ID | Name | Description | Surfaces |
|---|---|---|---|
| **F01** | Multi-lingual Home Hub | Faceted browsing across 30 primary items with category filters and search. | Web Portal, Kiosk |
| **F02** | Deep Zoom & Split Reader | Side-by-side view with zoomable facsimile scan, cleaned text, IndicTrans2 translation, TTS narration, and citation generator. | Web, Kiosk |
| **F03** | Cross-Lingual Hybrid Search | BM25 keyword + pgvector semantic dense retrieval with Web Speech API voice search. | Web, Kiosk |
| **F04** | Grounded AI Assistant | RAG conversational researcher responding solely from indexed corpus with clickable verified citations. | Web, Kiosk |
| **F05** | Quote Verifier | Sub-second semantic matching classifying quotes into *Verified Authenticated*, *Similar / Paraphrased*, or *Not Found*. | Web, Kiosk |
| **F06** | Interactive Timeline | 1891–1956 milestone explorer with 6 thematic filters and direct links to reader records. | Web, Kiosk |
| **F07** | Knowledge Graph | Interactive SVG graph linking entities (people, places, statutes, treatises) with force-directed layout. | Web, Kiosk |
| **F08** | Geospatial Map | Geographic cartography of key sites (Mhow, Vadodara, Columbia, LSE, Mahad, Delhi, Nagpur). | Web, Kiosk |
| **F09** | Exhibition Stories | 4 Curated visual essays with scrollytelling steps, archival citations, and authentic documents. | Web, Kiosk |
| **F10** | Media Player | Historic audio playback with synchronized WebVTT transcript and phrase-level seeking. | Web, Kiosk |
| **F11** | Personal Binder | Bookmark manager with 7-day ephemeral QR transfer token and print preview. | Web, Kiosk, Mobile |
| **F12** | Display Wall Mode | Ambient landscape view with auto-cycling quote cards, live metrics, and mobile handover QR. | Display Wall |
| **F13** | Archivist Ingest & Preservation | File upload, OCR confidence heatmap correction, Dublin Core metadata, and PREMIS fixity logs. | Archivist Console |
| **F14** | Kiosk Fleet Telemetry | Real-time heartbeat tracking, battery status, active screen telemetry, and remote reset. | Archivist Console |

---

### 5. Non-Functional Requirements
* **Response Latency:** Sub-second search response (< 400ms); sub-3s RAG generation.
* **Accessibility:** WCAG 2.1 AAA high-contrast mode, 64px minimum touch targets on kiosks, on-screen keyboard, and text-to-speech narration.
* **Privacy:** Automatic session wipe after 90 seconds of inactivity on kiosks; zero personal data stored during QR transfer.
* **Supported Locales:** English (`en`), Hindi (`hi`), Marathi (`mr`).
