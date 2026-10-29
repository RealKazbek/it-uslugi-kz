#!/bin/sh
# End-to-end: one lead through the frontend route /api/lead (as the website form does),
# then the backend stores it (source=site) and the admin notification is confirmed in the logs.
# The found lead must be newer than the newest lead id recorded before the POST.
set -eu

ROOT=$(cd "$(dirname "$0")/../.." && pwd)
FRONTEND_URL="${FRONTEND_URL:-http://127.0.0.1:3000}"
NAME="E2E site test"
BODY='{"product":"lending","lang":"ru","name":"E2E site test","contact":"+77000000001","channel":"whatsapp","message":"M5 end-to-end test from the site"}'

cd "$ROOT"
BASELINE=$(sh "$ROOT/scripts/e2e/max_lead_id.sh")
case "$BASELINE" in
  ''|*[!0-9]*) echo "E2E_SITE_FAILED: could not read the baseline lead id" >&2; exit 1 ;;
esac

response=$(curl -sS -X POST -H 'Content-Type: application/json' -d "$BODY" "$FRONTEND_URL/api/lead")
case "$response" in
  *'"ok":true'*) ;;
  *) echo "E2E_SITE_FAILED: frontend answered: $response" >&2; exit 1 ;;
esac
echo "E2E_SITE_POST=ok"

LEAD_ID=$(sh "$ROOT/scripts/e2e/site_lead_id.sh" "$NAME")
case "$LEAD_ID" in
  ''|*[!0-9]*) echo "E2E_SITE_FAILED: no site lead named '$NAME' in the database" >&2; exit 1 ;;
esac
if [ "$LEAD_ID" -le "$BASELINE" ]; then
  echo "E2E_SITE_FAILED: lead $LEAD_ID is not newer than baseline $BASELINE" >&2
  exit 1
fi
echo "E2E_SITE_LEAD_ID=$LEAD_ID (baseline $BASELINE)"

MESSAGE_ID=$(sh "$ROOT/scripts/e2e/await_notification.sh" "$LEAD_ID")
echo "E2E_SITE_MESSAGE_ID=$MESSAGE_ID"
echo "E2E_SITE_OK"
