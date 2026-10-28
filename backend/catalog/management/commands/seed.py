import logging
from typing import Any

from django.core.management.base import BaseCommand, CommandError

from catalog.services.fixtures import SeedError
from catalog.services.seed import seed_all

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Load categories, products, FAQs and cities from fixtures (idempotent)."

    def handle(self, *args: Any, **options: Any) -> None:
        try:
            result = seed_all()
        except SeedError as exc:
            logger.exception("Seed failed")
            raise CommandError(str(exc)) from exc
        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded: {result.categories} categories, {result.products} products, "
                f"{result.faqs} FAQs, {result.cities} cities."
            )
        )
