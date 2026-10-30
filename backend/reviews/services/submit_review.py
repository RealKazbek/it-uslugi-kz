import logging
from collections.abc import Mapping
from typing import Any

from reviews.models import Review

logger = logging.getLogger(__name__)


def submit_review(data: Mapping[str, Any]) -> Review:
    """Store a visitor review. It stays hidden until a moderator approves it in the admin."""
    review = Review.objects.create(
        name=data["name"],
        company=data.get("company", ""),
        city=data.get("city", ""),
        rating=data["rating"],
        text=data["text"],
        locale=data.get("locale", Review.Locale.RU),
        is_approved=False,
    )
    logger.info("Review %s submitted, awaiting moderation", review.pk)
    return review
