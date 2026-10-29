#!/bin/sh
# End-to-end: a private bot order runs in the bot container (real dispatcher, real backend),
# then the admin notification for the created lead is confirmed in the backend logs.
# Both streams of the bot process pass through the token redaction filter before printing.
set -eu

ROOT=$(cd "$(dirname "$0")/../.." && pwd)
cd "$ROOT"
REDACT='s/bot[0-9]+:[A-Za-z0-9_-]+/bot<REDACTED>/g'
OUT=$(mktemp)
ERR=$(mktemp)
trap 'rm -f "$OUT" "$ERR"' EXIT

STATUS=0
docker compose exec -T bot python -m app.e2e.bot_lead >"$OUT" 2>"$ERR" || STATUS=$?
sed -E "$REDACT" "$ERR" >&2
sed -E "$REDACT" "$OUT"
if [ "$STATUS" -ne 0 ]; then
  echo "E2E_BOT_FAILED: bot process exited with $STATUS" >&2
  exit 1
fi

LEAD_ID=$(sed -n 's/^E2E_LEAD_ID=//p' "$OUT" | tail -n 1)
case "$LEAD_ID" in
  ''|*[!0-9]*) echo "E2E_BOT_FAILED: no lead id reported" >&2; exit 1 ;;
esac
MESSAGE_ID=$(sh "$ROOT/scripts/e2e/await_notification.sh" "$LEAD_ID")
echo "E2E_BOT_LEAD_ID=$LEAD_ID"
echo "E2E_BOT_MESSAGE_ID=$MESSAGE_ID"
echo "E2E_BOT_NOTIFIED=ok"
