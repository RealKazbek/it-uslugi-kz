#!/bin/sh
# Usage: site_lead_id.sh NAME
# Prints the id of the newest site lead with this name (empty if none). Reads the database only.
set -eu

NAME="${1:?usage: site_lead_id.sh NAME}"
docker compose exec -T backend python manage.py shell -c \
  "from leads.models import Lead; l = Lead.objects.filter(source='site', name='$NAME').order_by('-id').first(); print(l.id if l else '')" \
  | tr -d '\r' | tail -n 1
