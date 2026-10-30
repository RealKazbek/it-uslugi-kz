"""Any change to a review refreshes the frontend pages that show reviews."""

from typing import Any

from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from core.services.revalidate import schedule_revalidation
from reviews.models import Review

REVIEW_TAGS = ["reviews"]


@receiver(post_save, sender=Review)
@receiver(post_delete, sender=Review)
def on_review_changed(sender: type[Review], instance: Review, **kwargs: Any) -> None:
    schedule_revalidation(REVIEW_TAGS)
