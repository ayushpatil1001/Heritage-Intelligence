FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY apps/ai-service/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY apps/ai-service ./apps/ai-service

EXPOSE 8001

ENV PYTHONPATH=/app

CMD ["python", "-m", "uvicorn", "apps.ai-service.main:app", "--host", "0.0.0.0", "--port", "8001"]
