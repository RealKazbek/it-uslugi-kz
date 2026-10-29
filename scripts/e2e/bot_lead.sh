#!/bin/sh
# End-to-end: a private bot order runs in the bot container (real dispatcher, real backend),
# then the admin notification for the created lead is confirmed in the backend logs.
set -eu

ROOT=$(cd "$(dirname "$0")/../.." && pwd)
cd "$ROOT"

OUTPUT=$(docker compose exec -T bot python -m app.e2e.bot_lead) || {
  echo "$OUTPUT" | sed -E 's/bot[0-9]+:[A-Za-z0-9_-]+/bot<REDACTED>/g'
  echo "E2E_BOT_FAILED: see above" >&2
  exit 1
}
echo "$OUTPUT" | grep -v '^E2E_LEAD_ID=' || true
LEAD_ID=$(echo "$OUTPUT" | sed -n 's/^E2E_LEAD_ID=//p' | tail -n 1)
case "$LEAD_ID" in
  ''|*[!0-9]*) echo "E2E_BOT_FAILED: no lead id reported" >&2; exit 1 ;;
esac
MESSAGE_ID=$(sh "$ROOT/scripts/e2e/await_notification.sh" "$LEAD_ID")
echo "E2E_BOT_LEAD_ID=$LEAD_ID"
echo "E2E_BOT_MESSAGE_ID=$MESSAGE_ID"
echo "E2E_BOT_NOTIFIED=ok"
