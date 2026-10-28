"""Lead input validation. Public, bot and internal endpoints share the same base rules."""

from typing import Any

from rest_framework import serializers

from catalog.models import Product
from leads.models import Lead


class LeadInputSerializer(serializers.Serializer):  # type: ignore[type-arg]
    name = serializers.CharField(min_length=2, max_length=80)
    contact = serializers.CharField(min_length=3, max_length=100)
    channel = serializers.ChoiceField(choices=Lead.Channel.choices, default=Lead.Channel.OTHER)
    product = serializers.SlugField(
        max_length=120, required=False, allow_blank=True, allow_null=True
    )
    message = serializers.CharField(max_length=2000, required=False, allow_blank=True)
    page_url = serializers.URLField(max_length=500, required=False, allow_blank=True)
    lang = serializers.ChoiceField(choices=Lead.Lang.choices, default=Lead.Lang.RU)

    def validate_product(self, value: str | None) -> Product | None:
        if not value:
            return None
        product = Product.objects.filter(slug=value, is_active=True).first()
        if product is None:
            raise serializers.ValidationError("Unknown or inactive product.")
        return product


class LeadPublicSerializer(LeadInputSerializer):
    """Website form. `website` is a honeypot: humans leave it empty."""

    website = serializers.CharField(required=False, allow_blank=True, max_length=200)


class LeadInternalSerializer(LeadInputSerializer):
    """Bot submissions: no honeypot, carries the Telegram user id."""

    telegram_user_id = serializers.IntegerField(required=False, allow_null=True, min_value=1)


class LeadCreatedSerializer(serializers.Serializer):  # type: ignore[type-arg]
    ok = serializers.BooleanField()
    id = serializers.IntegerField(required=False)


def lead_kwargs(data: dict[str, Any]) -> dict[str, Any]:
    """Pick the fields a Lead row takes from validated input (drops the honeypot)."""
    keys = ("name", "contact", "channel", "product", "message", "page_url", "lang")
    kwargs = {key: data[key] for key in keys if key in data}
    if "telegram_user_id" in data:
        kwargs["telegram_user_id"] = data["telegram_user_id"]
    return kwargs
