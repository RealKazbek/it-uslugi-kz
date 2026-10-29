PY=.venv/bin/python
DC=docker compose
# Bot checks run in a throwaway python:3.12-slim container as the host user. The venv lives in /tmp
# inside the container, so nothing root-owned is written into bot/.
BOT_VENV=python -m venv /tmp/venv && /tmp/venv/bin/pip install -q -r requirements-dev.txt
BOT_RUN=docker run --rm --user $$(id -u):$$(id -g) -e HOME=/tmp -e PIP_NO_CACHE_DIR=1 -v "$(CURDIR)/bot:/w" -w /w python:3.12-slim sh -c

.PHONY: up down init seed test lint bot-lint bot-test

# Start db, backend, frontend and bot, and wait until they are healthy.
# On the very first start use `make init`: the frontend builds its pages from the API, so the data must exist first.
up:
	$(DC) up -d --build --wait db backend frontend bot

down:
	$(DC) down

# First run (or an empty database): start db and backend, load the seed data, then start the frontend
# (its production build reads the catalog) and the bot.
init:
	$(DC) up -d --build --wait db backend
	$(DC) exec -T backend python manage.py seed
	$(DC) up -d --build --wait frontend bot

seed:
	$(DC) exec backend python manage.py seed

test: bot-test
	cd backend && .venv/bin/pytest
	cd frontend && npm test

lint: bot-lint
	cd backend && .venv/bin/ruff check . && .venv/bin/ruff format --check . && DJANGO_DEBUG=1 .venv/bin/mypy .
	cd frontend && npm run lint && npm run typecheck

bot-lint:
	$(BOT_RUN) '$(BOT_VENV) && /tmp/venv/bin/ruff check . && /tmp/venv/bin/ruff format --check . && /tmp/venv/bin/mypy .'

bot-test:
	$(BOT_RUN) '$(BOT_VENV) && /tmp/venv/bin/pytest'
