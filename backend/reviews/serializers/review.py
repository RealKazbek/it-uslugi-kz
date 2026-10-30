from rest_framework import serializers

from reviews.models import Review


class ReviewPublicSerializer(serializers.ModelSerializer[Review]):
    """What the website shows for an approved review."""

    class Meta:
        model = Review
        fields = ["id", "name", "company", "city", "rating", "text", "locale", "created_at"]


class ReviewSubmitSerializer(serializers.Serializer):  # type: ignore[type-arg]
    """Website form. `website` is a honeypot: humans leave it empty. Never stored."""

    name = serializers.CharField(min_length=2, max_length=80)
    company = serializers.CharField(max_length=120, required=False, allow_blank=True)
    city = serializers.CharField(max_length=80, required=False, allow_blank=True)
    rating = serializers.IntegerField(min_value=1, max_value=5)
    text = serializers.CharField(min_length=10, max_length=2000)
    locale = serializers.ChoiceField(choices=Review.Locale.choices, default=Review.Locale.RU)
    website = serializers.CharField(required=False, allow_blank=True)


class ReviewOkSerializer(serializers.Serializer):  # type: ignore[type-arg]
    ok = serializers.BooleanField()
