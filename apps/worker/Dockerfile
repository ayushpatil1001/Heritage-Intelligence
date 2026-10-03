FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    ffmpeg \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY apps/worker/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY apps/worker ./apps/worker
COPY apps/api ./apps/api

ENV PYTHONPATH=/app

CMD ["celery", "-A", "apps.worker.celery_app", "worker", "--loglevel=info"]
