FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

RUN groupadd --system app && useradd --system --gid app --home /app app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app ./app

USER app

# No HTTP endpoint. The bot writes /tmp/bot-heartbeat only after a successful getMe call every 30 s
# (app/heartbeat.py), so this check fails when Telegram is unreachable or the event loop is blocked.
# It is the only healthcheck: docker-compose.yml does not repeat it.
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD ["python", "-m", "app.healthcheck"]

CMD ["python", "-m", "app.main"]
