#!/bin/sh
# End-to-end: one lead through the frontend route /api/lead (as the website form does),
# then the backend stores it (source=site) and the admin notification is confirmed in the logs.
set -eu

ROOT=$(cd "$(dirname "$0")/../.." && pwd)
FRONTEND_URL="${FRONTEND_URL:-http://127.0.0.1:3000}"
NAME="E2E site test"
BODY='{"product":"lending","lang":"ru","name":"E2E site test","contact":"+77000000001","channel":"whatsapp","message":"M5 end-to-end test from the site"}'

cd "$ROOT"
response=$(curl -sS -X POST -H 'Content-Type: application/json' -d "$BODY" "$FRONTEND_URL/api/lead")
case "$response" in
  *'"ok":true'*) ;;
  *) echo "E2E_SITE_FAILED: frontend answered: $response" >&2; exit 1 ;;
esac
echo "E2E_SITE_POST=ok"

LEAD_ID=$(docker compose exec -T backend python manage.py shell -c \
  "from leads.models import Lead; l = Lead.objects.filter(source='site', name='$NAME').order_by('-id').first(); print(l.id if l else '')" \
  | tr -d '\r' | tail -n 1)
case "$LEAD_ID" in
  ''|*[!0-9]*) echo "E2E_SITE_FAILED: no site lead named '$NAME' in the database" >&2; exit 1 ;;
esac
echo "E2E_SITE_LEAD_ID=$LEAD_ID"

MESSAGE_ID=$(sh "$ROOT/scripts/e2e/await_notification.sh" "$LEAD_ID")
echo "E2E_SITE_MESSAGE_ID=$MESSAGE_ID"
echo "E2E_SITE_OK"
