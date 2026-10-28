PY=.venv/bin/python
DC=docker compose

.PHONY: up down seed test lint

up:
	$(DC) up -d --build db backend

down:
	$(DC) down

seed:
	$(DC) exec backend python manage.py seed

test:
	cd backend && .venv/bin/pytest

lint:
	cd backend && .venv/bin/ruff check . && .venv/bin/ruff format --check . && DJANGO_DEBUG=1 .venv/bin/mypy .
