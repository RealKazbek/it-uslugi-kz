from django.db.models import QuerySet

from reviews.models import Review


def approved_reviews() -> QuerySet[Review]:
    return Review.objects.filter(is_approved=True)
