PY=.venv/bin/python
DC=docker compose
# The bot starts only when .env has both TELEGRAM_BOT_TOKEN and ADMIN_CHAT_ID (compose profile "bot").
BOT_PROFILE=$(shell grep -Eq '^TELEGRAM_BOT_TOKEN=.+' .env 2>/dev/null && grep -Eq '^ADMIN_CHAT_ID=.+' .env 2>/dev/null && echo --profile bot)
REQUIRED_ENV=POSTGRES_DB POSTGRES_USER POSTGRES_PASSWORD DJANGO_SECRET_KEY INTERNAL_API_TOKEN
# Bot checks run in a throwaway python:3.12-slim container as the host user. The venv lives in /tmp
# inside the container, so nothing root-owned is written into bot/.
BOT_VENV=python -m venv /tmp/venv && /tmp/venv/bin/pip install -q -r requirements-dev.txt
BOT_RUN=docker run --rm --user $$(id -u):$$(id -g) -e HOME=/tmp -e PIP_NO_CACHE_DIR=1 -v "$(CURDIR)/bot:/w" -w /w python:3.12-slim sh -c

.PHONY: up down init seed test lint bot-lint bot-test e2e dev check-env

# Fail early with a clear message when .env is missing or a required value is empty.
check-env:
	@test -f .env || { echo "Run: cp .env.example .env and fill it (see README, Run locally)"; exit 1; }
	@for v in $(REQUIRED_ENV); do grep -Eq "^$$v=.+" .env || { echo "$$v is empty in .env"; exit 1; }; done

# Local one-command start: db + backend (migrations run in its entrypoint), seed if the catalog is empty (SEED=1 forces it), frontend, and the bot when its token is set.
dev: check-env
	$(DC) up -d --build --wait db backend
	$(DC) exec -T backend python manage.py shell -c "import sys; from catalog.models import Product; sys.exit(0 if Product.objects.exists() else 1)" && [ "$(SEED)" != "1" ] || $(DC) exec -T backend python manage.py seed
	$(DC) $(BOT_PROFILE) up -d --build --wait db backend frontend $(if $(BOT_PROFILE),bot)
	@echo "Site: http://127.0.0.1:3000  Admin: http://127.0.0.1:8000/admin/  Health: http://127.0.0.1:8000/api/health"
	@test -n "$(BOT_PROFILE)" || echo "Bot not started: TELEGRAM_BOT_TOKEN or ADMIN_CHAT_ID is empty in .env"

# Start db, backend, frontend and bot, and wait until they are healthy.
# On the very first start use `make init`: the frontend builds its pages from the API, so the data must exist first.
up: check-env
	$(DC) $(BOT_PROFILE) up -d --build --wait db backend frontend $(if $(BOT_PROFILE),bot)

down:
	$(DC) --profile bot down

# First run (or an empty database): start db and backend, load the seed data, then start the frontend
# (its production build reads the catalog) and the bot.
init: check-env
	$(DC) up -d --build --wait db backend
	$(DC) exec -T backend python manage.py seed
	$(DC) $(BOT_PROFILE) up -d --build --wait frontend $(if $(BOT_PROFILE),bot)

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

# End-to-end run against the running stack (`make up` first). Creates 2 real leads and 2 real
# admin notifications on every run. Needs curl; runs the bot side inside the bot container.
e2e:
	@echo "== E2E: lead from the website (frontend /api/lead) =="
	@sh scripts/e2e/site_lead.sh
	@echo "== E2E: lead from the bot (real dispatcher, real backend) =="
	@sh scripts/e2e/bot_lead.sh
	@echo "== E2E passed: 2 leads (site, bot), 2 admin notifications confirmed in backend logs =="
