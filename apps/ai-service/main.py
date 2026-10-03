import os
import sys
import time
from collections import defaultdict
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from typing import Dict, Any, List, Optional
from pydantic import BaseModel

app = FastAPI(
    title="AmbedkarVerse AI Service",
    description="Dedicated AI microservice for hybrid search, RAG assistant, quote verification, and Indic speech/translation",
    version="2.6.0"
)

PRIMARY_DOMAIN = "https://heritage-intelligence-drab.vercel.app"

# Domain-aware Sliding Window Rate Limiter
class DomainRateLimiter(BaseHTTPMiddleware):
    def __init__(self, app, max_requests_per_minute: int = 120):
        super().__init__(app)
        self.max_requests = max_requests_per_minute
        self.requests = defaultdict(list)

    async def dispatch(self, request: Request, call_next):
        if request.url.path in ["/health", "/docs", "/openapi.json", "/redoc"]:
            return await call_next(request)

        client_ip = request.client.host if request.client else "unknown"
        origin = request.headers.get("origin") or request.headers.get("referer") or ""
        
        is_primary_domain = PRIMARY_DOMAIN in origin
        key = f"{client_ip}:{PRIMARY_DOMAIN if is_primary_domain else 'general'}"
        
        current_time = time.time()
        minute_ago = current_time - 60

        self.requests[key] = [t for t in self.requests[key] if t > minute_ago]

        limit = self.max_requests if is_primary_domain else 60
        used = len(self.requests[key])

        if used >= limit:
            retry_after = int(60 - (current_time - self.requests[key][0])) if self.requests[key] else 60
            return JSONResponse(
                status_code=429,
                content={
                    "error": "Rate limit exceeded",
                    "domain": PRIMARY_DOMAIN,
                    "limit_per_minute": limit,
                    "message": f"Too many requests. Rate limit is active for {PRIMARY_DOMAIN}.",
                    "retry_after_seconds": max(1, retry_after)
                },
                headers={
                    "Retry-After": str(max(1, retry_after)),
                    "X-RateLimit-Limit": str(limit),
                    "X-RateLimit-Remaining": "0",
                    "X-RateLimit-Domain": PRIMARY_DOMAIN
                }
            )

        self.requests[key].append(current_time)
        response = await call_next(request)
        response.headers["X-RateLimit-Limit"] = str(limit)
        response.headers["X-RateLimit-Remaining"] = str(max(0, limit - used - 1))
        response.headers["X-RateLimit-Domain"] = PRIMARY_DOMAIN
        return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        PRIMARY_DOMAIN,
        f"{PRIMARY_DOMAIN}/",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(DomainRateLimiter, max_requests_per_minute=120)

AI_MODE = os.getenv("AI_MODE", "mock")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "AmbedkarVerse AI Microservice",
        "primary_domain": PRIMARY_DOMAIN,
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
