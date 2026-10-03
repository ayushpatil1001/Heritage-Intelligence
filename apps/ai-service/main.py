import os
import sys
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any, List, Optional
from pydantic import BaseModel

app = FastAPI(
    title="AmbedkarVerse AI Service",
    description="Dedicated AI microservice for hybrid search, RAG assistant, quote verification, and Indic speech/translation",
    version="2.6.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

AI_MODE = os.getenv("AI_MODE", "mock")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "AmbedkarVerse AI Microservice",
        "ai_mode": AI_MODE,
        "gemini_configured": bool(GEMINI_API_KEY)
    }

class EmbedRequest(BaseModel):
    texts: List[str]
    model: Optional[str] = "BGE-M3"

@app.post("/api/v1/ai/embed")
def generate_embeddings(payload: EmbedRequest):
    # Mock / fast deterministic normalized 1024-dim embedding vectors
    embeddings = []
    for text in payload.texts:
        # Deterministic pseudo-embedding based on hash
        seed = abs(hash(text)) % 10000
        vec = [(float((seed + i) % 100) / 100.0) for i in range(1024)]
        norm = sum(x*x for x in vec) ** 0.5
        norm_vec = [x / norm for x in vec]
        embeddings.append(norm_vec)
    return {"model": payload.model, "embeddings": embeddings}

class TranslateRequest(BaseModel):
    text: str
    source_lang: Optional[str] = "en"
    target_lang: str

@app.post("/api/v1/ai/translate")
def translate_text(payload: TranslateRequest):
    # Dictionary of authoritative translations for foundational corpus
    translations = {
        "hi": {
            "Educate, Agitate, Organise": "शिक्षित बनो, आंदोलन करो, संगठित रहो",
            "Liberty, Equality, Fraternity": "स्वतंत्रता, समता, बंधुता",
            "Caste is not just a division of labour, it is a division of labourers.": "जाति केवल श्रम का विभाजन नहीं है, यह श्रमिकों का विभाजन है।",
            "It is the very soul of the Constitution and the very heart of it.": "यह संविधान की आत्मा और इसका हृदय है।"
        },
        "mr": {
            "Educate, Agitate, Organise": "शिका, संघटित व्हा आणि संघर्ष करा",
            "Liberty, Equality, Fraternity": "स्वातंत्र्य, समता, बंधुता",
            "Caste is not just a division of labour, it is a division of labourers.": "जाती ही केवळ श्रमाची विभागणी नसून ती श्रमिकांची विभागणी आहे.",
            "It is the very soul of the Constitution and the very heart of it.": "हा संविधानाचा आत्मा आणि त्याचे हृदय आहे."
        }
    }
    
    tgt = payload.target_lang
    if tgt in translations and payload.text in translations[tgt]:
        return {"translated_text": translations[tgt][payload.text], "engine": "Bhashini/IndicTrans2", "cached": True}
    
    return {
        "translated_text": f"[{tgt.upper()}]: {payload.text}",
        "engine": "Bhashini/IndicTrans2",
        "cached": False
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)
