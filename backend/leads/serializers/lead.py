"""Lead input validation. Public, bot and internal endpoints share the same base rules."""

from rest_framework import serializers

from leads.models import Lead

MAX_TELEGRAM_USER_ID = 2**63 - 1


class LeadInputSerializer(serializers.Serializer):  # type: ignore[type-arg]
    """Unknown or inactive `product` slugs are accepted; the service keeps them in the message."""

    name = serializers.CharField(min_length=2, max_length=80)
    contact = serializers.CharField(min_length=3, max_length=100)
    channel = serializers.ChoiceField(choices=Lead.Channel.choices, default=Lead.Channel.OTHER)
    product = serializers.SlugField(
        max_length=120, required=False, allow_blank=True, allow_null=True
    )
    message = serializers.CharField(max_length=2000, required=False, allow_blank=True)
    page_url = serializers.URLField(max_length=500, required=False, allow_blank=True)
    lang = serializers.ChoiceField(choices=Lead.Lang.choices, default=Lead.Lang.RU)


class LeadPublicSerializer(LeadInputSerializer):
    """Website form. `website` is a honeypot: humans leave it empty. Never stored."""

    website = serializers.CharField(required=False, allow_blank=True)


class LeadInternalSerializer(LeadInputSerializer):
    """Bot submissions: no honeypot, carries the Telegram user id."""

    telegram_user_id = serializers.IntegerField(
        required=False, allow_null=True, min_value=1, max_value=MAX_TELEGRAM_USER_ID
    )


class LeadOkSerializer(serializers.Serializer):  # type: ignore[type-arg]
    ok = serializers.BooleanField()


class LeadCreatedSerializer(LeadOkSerializer):
    id = serializers.IntegerField(required=False)
