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

# No HTTP endpoint: the healthcheck verifies that the polling loop still writes its heartbeat file
# (app/heartbeat.py writes /tmp/bot-heartbeat every 30 s; app/healthcheck.py fails after 90 s).
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD ["python", "-m", "app.healthcheck"]

CMD ["python", "-m", "app.main"]
