#!/bin/sh
# Usage: await_notification.sh LEAD_ID
# Polls the backend logs until "Telegram notification sent for lead N (message_id M)" appears.
# Prints the message_id on success. Log lines are redacted before they are read here.
set -eu

LEAD_ID="${1:?usage: await_notification.sh LEAD_ID}"
case "$LEAD_ID" in
  ''|*[!0-9]*) echo "LEAD_ID must be a number" >&2; exit 2 ;;
esac

ATTEMPTS=30
i=0
while [ "$i" -lt "$ATTEMPTS" ]; do
  line=$(docker compose logs --no-color --tail 5000 backend 2>&1 \
    | sed -E 's/bot[0-9]+:[A-Za-z0-9_-]+/bot<REDACTED>/g' \
    | grep -E "Telegram notification sent for lead ${LEAD_ID} \(message_id [0-9]+\)" \
    | tail -n 1 || true)
  if [ -n "$line" ]; then
    echo "$line" | sed -E 's/.*message_id ([0-9]+)\).*/\1/'
    exit 0
  fi
  i=$((i + 1))
  sleep 1
done
echo "no Telegram notification log line for lead ${LEAD_ID} after ${ATTEMPTS}s" >&2
exit 1
