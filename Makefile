PY=.venv/bin/python
DC=docker compose

.PHONY: up down init seed test lint

# Start db, backend and frontend and wait until they are healthy.
# On the very first start use `make init`: the frontend builds its pages from the API, so the data must exist first.
up:
	$(DC) up -d --build --wait db backend frontend

down:
	$(DC) down

# First run (or an empty database): start db and backend, load the seed data, then start the frontend,
# so its production build can read the catalog. The bot service is added in M4 and joins `up`.
init:
	$(DC) up -d --build --wait db backend
	$(DC) exec -T backend python manage.py seed
	$(DC) up -d --build --wait frontend

seed:
	$(DC) exec backend python manage.py seed

test:
	cd backend && .venv/bin/pytest
	cd frontend && npm test

lint:
	cd backend && .venv/bin/ruff check . && .venv/bin/ruff format --check . && DJANGO_DEBUG=1 .venv/bin/mypy .
	cd frontend && npm run lint && npm run typecheck
