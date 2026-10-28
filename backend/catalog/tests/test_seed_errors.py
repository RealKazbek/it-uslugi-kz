import io
from typing import Any

import pytest
from django.core.management import call_command
from django.core.management.base import CommandError

from catalog.models import Product
from catalog.services.fixtures import SeedError, resolve_slugs
from catalog.services.seed import seed_products

pytestmark = pytest.mark.django_db


def test_resolve_slugs_names_unknown_slug() -> None:
    with pytest.raises(SeedError, match="no-such-product"):
        resolve_slugs(Product.objects.all(), ["no-such-product"], "product lending")


def test_seed_products_rejects_unknown_category() -> None:
    item: dict[str, Any] = {
        "slug": "lending",
        "category": "missing-category",
        "faqs": [],
        "related": [],
    }

    with pytest.raises(SeedError, match="unknown category missing-category"):
        seed_products([item])


def test_seed_command_turns_seed_error_into_command_error(monkeypatch: pytest.MonkeyPatch) -> None:
    def failing_seed() -> None:
        raise SeedError("broken fixture")

    monkeypatch.setattr("catalog.management.commands.seed.seed_all", failing_seed)

    with pytest.raises(CommandError, match="broken fixture"):
        call_command("seed", stdout=io.StringIO())
