#!/bin/sh
# Nightly PostgreSQL dump for uslugi, run by root from /etc/cron.d/uslugi-backup.
# The dump is written to a .tmp file and renamed only after pg_dump succeeds; a failed run removes
# the partial file. pg_dump's stderr and the outcome go to syslog under the tag uslugi-backup.
set -eu

APP_DIR="${APP_DIR:-/opt/it-uslugi}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/uslugi}"
KEEP_DAYS="${KEEP_DAYS:-14}"

FINAL="$BACKUP_DIR/db-$(date +%F).dump"
TMP="$FINAL.tmp"
ERR=$(mktemp)
trap 'rm -f "$ERR"' EXIT

cd "$APP_DIR"
if docker compose exec -T db sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc' \
  >"$TMP" 2>"$ERR"; then
  mv "$TMP" "$FINAL"
  find "$BACKUP_DIR" -name 'db-*.dump' -mtime +"$KEEP_DAYS" -delete
  logger -t uslugi-backup -p user.info "backup ok: $FINAL"
  exit 0
fi

rm -f "$TMP"
logger -t uslugi-backup -p user.err "backup failed, no file written: $FINAL"
logger -t uslugi-backup -p user.err -f "$ERR"
exit 1
