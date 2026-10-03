.PHONY: help up down build seed test clean logs restart

help:
	@echo "AmbedkarVerse - Digital Heritage Archive (SIH 2026 PS 26096)"
	@echo "Commands:"
	@echo "  make up        Start all services using Docker Compose"
	@echo "  make down      Stop all containers"
	@echo "  make build     Build all Docker containers"
	@echo "  make seed      Run database migrations and load seed datasets"
	@echo "  make test      Execute backend and frontend test suites"
	@echo "  make logs      Tail logs from all containers"
	@echo "  make restart   Restart web and API services"

up:
	docker compose up -d

down:
	docker compose down

build:
	docker compose build

seed:
	python apps/api/seed_runner.py

test:
	pytest apps/api/tests apps/ai-service/tests
	npm --prefix apps/web test

logs:
	docker compose logs -f

restart:
	docker compose restart web api ai-service worker
