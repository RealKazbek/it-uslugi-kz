#!/bin/sh
# Prints the newest lead id in the database (0 when there are no leads). Used as a baseline.
set -eu

docker compose exec -T backend python manage.py shell -c \
  "from leads.models import Lead; print(Lead.objects.order_by('-id').values_list('id', flat=True).first() or 0)" \
  | tr -d '\r' | tail -n 1
