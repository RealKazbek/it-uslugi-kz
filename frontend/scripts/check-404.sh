#!/bin/sh
# Starts `next start` on a free port, checks that unknown URLs get a server-rendered 404,
# then stops the server. Run after `npm run build`.
set -eu

PORT="${PORT:-3401}"
cd "$(dirname "$0")/.."
LOG="$(mktemp)"

npx next start -p "$PORT" -H 127.0.0.1 >"$LOG" 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT

for _ in $(seq 1 60); do
  if curl -s -o /dev/null "http://127.0.0.1:$PORT/"; then break; fi
  sleep 1
done

failed=0
for path in /nope /products/nope; do
  body="$(mktemp)"
  status="$(curl -s -o "$body" -w '%{http_code}' "http://127.0.0.1:$PORT$path")"
  if [ "$status" != "404" ]; then
    echo "FAIL $path: status $status, expected 404"; failed=1
  fi
  if ! grep -q '<h1' "$body"; then
    echo "FAIL $path: no <h1> in server HTML"; failed=1
  fi
  if ! grep -q 'name="robots" content="noindex' "$body"; then
    echo "FAIL $path: noindex meta missing"; failed=1
  fi
  rm -f "$body"
  [ "$failed" = "0" ] && echo "OK $path -> 404 with <h1> and noindex"
done

if [ "$failed" != "0" ]; then
  echo "--- server log ---"; cat "$LOG"; rm -f "$LOG"; exit 1
fi
rm -f "$LOG"
echo "404 check passed"
