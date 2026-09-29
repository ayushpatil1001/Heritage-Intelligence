# Ambedkar Heritage Intelligence & Kiosk System (AHI-KS)
**Smart India Hackathon (SIH 2024–26) | Problem Statement ID: 26096**  
**Ministry of Social Justice & Empowerment (MoSJE) • Target Sites: DAIC New Delhi & State Archives**

An AI-enabled **Digital Heritage Archive, Institutional Knowledge Platform, and Turnkey Edge Kiosk Web Application** dedicated to **Dr. B. R. Ambedkar**.

---

## Core Architecture & Features

1. **Zero-Hallucination Dual-Verification Retrieval Pipeline (`>= 0.85` Guardrail)**:
   - Combines **Dense Multilingual Vector Cosine Similarity** with **Sparse BM25 Lexical Citation Matching**.
   - Every response produces **split-screen page-level bounding-box citations** pointing to scanned Constituent Assembly Debates (CAD Vol. I–XII) and Dr. Ambedkar Foundation Writings & Speeches (BAWS Vol. 1–22).
   - Queries scoring `< 0.85` automatically trigger the mandated guardrail rejection:  
     *"This subject is not documented in the verified archival records of Dr. Ambedkar Foundation."*
2. **Digital Heritage Vault (Multimedia Repository)**:
   - Interactive explorer for **Books (BAWS Vol. 1–22)**, **Constituent Assembly Debates**, **Historic Speeches**, **Rare Manuscripts**, **Archival Photographs**, and **Documentaries**.
3. **Interactive CAD Visualizer**:
   - Node-link constitutional graph tracing Articles (`Art. 32`, `Art. 14`, `Art. 15`, `Art. 17`, `Art. 38`, `Reserve Bank / Finance`) back to Draft Articles, amendments, and Dr. Ambedkar's exact assembly rejoinders.
4. **Synchronized Audio Karaoke & Parliamentary Lexicon**:
   - Real-time transcript highlighting synced to voice playback with interactive explanations of archaic legal terms (*Grammar of Anarchy, Prerogative Writs, Habeas Corpus, Quo Warranto, Certiorari*) in 5 languages.
5. **Bhashini 5-Language Speech Inclusivity & Smart Kiosk Appliance Controls**:
   - Supports **Marathi (मराठी), Hindi (हिन्दी), Tamil (தமிழ்), Telugu (తెలుగు), and English**.
   - Includes **128GB NVMe Local Edge Failover** (Scenario 3 Network Unplug toggle), **40kHz Ultrasonic Audio Dome mode**, **HC-SR04 Proximity Auto-Wake radar**, and **Divyangjan GIGW 3.0 / WCAG 2.1 AA Wheelchair UI & High-Contrast modes**.

---

## Quick Start

### 1. Start Python FastAPI Backend (`port 8000`)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2. Start React + Vite Frontend (`port 5173`)
```bash
cd frontend
npm install
npm run dev
```
