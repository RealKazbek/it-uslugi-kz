"""Schedules frontend revalidation when catalog records change (skipped during seeding)."""

from collections.abc import Iterator
from contextlib import contextmanager
from contextvars import ContextVar
from typing import Any

from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from catalog.models import Category, Product, ProductFAQ
from catalog.services.tags import category_tags, city_tags, product_tags
from cities.models import City
from core.services.revalidate import schedule_revalidation

_suppressed: ContextVar[bool] = ContextVar("revalidation_suppressed", default=False)


@contextmanager
def revalidation_suppressed() -> Iterator[None]:
    """Turn off revalidation signals, e.g. while the seed command writes many rows."""
    token = _suppressed.set(True)
    try:
        yield
    finally:
        _suppressed.reset(token)


def _schedule(tags: list[str]) -> None:
    if not _suppressed.get():
        schedule_revalidation(tags)


@receiver(post_save, sender=Product)
@receiver(post_delete, sender=Product)
def on_product_changed(sender: type[Product], instance: Product, **kwargs: Any) -> None:
    _schedule(product_tags(instance.slug))


@receiver(post_save, sender=ProductFAQ)
@receiver(post_delete, sender=ProductFAQ)
def on_faq_changed(sender: type[ProductFAQ], instance: ProductFAQ, **kwargs: Any) -> None:
    # Look the slug up by id: during a cascade delete the product row may already be gone.
    slug = Product.objects.filter(pk=instance.product_id).values_list("slug", flat=True).first()
    if slug is not None:
        _schedule(product_tags(slug))


@receiver(post_save, sender=Category)
@receiver(post_delete, sender=Category)
def on_category_changed(sender: type[Category], instance: Category, **kwargs: Any) -> None:
    _schedule(category_tags(instance.pk))


@receiver(post_save, sender=City)
@receiver(post_delete, sender=City)
def on_city_changed(sender: type[City], instance: City, **kwargs: Any) -> None:
    _schedule(city_tags(instance.slug))
