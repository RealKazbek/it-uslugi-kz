# Engineering rules (mandatory for every agent)

## Size limits
- File: target <= 200 lines, HARD max 300. Split by responsibility before reaching it.
- Function/component: <= 50 lines. Max 3 levels of nesting.
- No "utils.py"/"helpers.ts" dumping grounds: name modules by what they do.

## Structure
- backend/ Django: one app per domain (catalog, cities, leads, core). Inside an app: models/, serializers/, views/, services/ (business logic), selectors/ (read queries), tests/. Views are thin: validate -> call service -> respond.
- frontend/ Next.js App Router: app/ (routes only), components/ (ui/ primitives, features/ per domain), lib/api/ (typed API client), lib/i18n/, types/. No fetch calls inside components; use lib/api.
- bot/ aiogram 3: handlers/ (per feature), keyboards/, services/ (backend API client), config.py. No business logic in handlers.
- Config only via environment variables (settings read in one place).

## Quality
- Python: type hints everywhere, ruff + mypy clean. TS: strict mode, no `any`, eslint clean.
- Every service and API endpoint has tests (pytest-django; vitest for frontend logic; bot handlers with mocked API).
- Small commits with clear messages, one milestone = several commits.
- Errors: handle explicitly, log with context, never swallow.

## Security
- Secrets (TELEGRAM_BOT_TOKEN, ADMIN_CHAT_ID, DB password, SECRET_KEY, INTERNAL_API_TOKEN) ONLY in .env. Never in code, SPEC, logs, tests or commits. Provide .env.example with empty values.
- Validate all input; throttle and honeypot the public lead endpoint.

## Workflow
- Main session plans and delegates; "coder" implements; "reviewer" verifies at each milestone end.
- Do not ask the user questions; decide and log in DECISIONS.md.
