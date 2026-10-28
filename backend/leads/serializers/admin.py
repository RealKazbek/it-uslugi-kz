"""Lead output and status payloads for the internal (bot) API."""

from typing import Any

from rest_framework import serializers

from leads.models import Lead


class LeadAdminSerializer(serializers.ModelSerializer):  # type: ignore[type-arg]
    product_slug = serializers.SerializerMethodField()
    product_title_ru = serializers.SerializerMethodField()

    class Meta:
        model = Lead
        fields = [
            "id",
            "name",
            "contact",
            "channel",
            "source",
            "product_slug",
            "product_title_ru",
            "message",
            "page_url",
            "lang",
            "status",
            "telegram_user_id",
            "created_at",
        ]

    def get_product_slug(self, obj: Lead) -> str | None:
        return obj.product.slug if obj.product else None

    def get_product_title_ru(self, obj: Lead) -> str | None:
        return obj.product.title_ru if obj.product else None


class LeadStatusSerializer(serializers.Serializer):  # type: ignore[type-arg]
    status = serializers.ChoiceField(choices=Lead.Status.choices)


class LeadListQuery(serializers.Serializer):  # type: ignore[type-arg]
    limit = serializers.IntegerField(min_value=1, max_value=50, default=10, required=False)


class StatusCountsSerializer(serializers.Serializer):  # type: ignore[type-arg]
    new = serializers.IntegerField()
    in_progress = serializers.IntegerField()
    won = serializers.IntegerField()
    lost = serializers.IntegerField()


class LeadStatsSerializer(serializers.Serializer):  # type: ignore[type-arg]
    total = StatusCountsSerializer()
    last_7_days = StatusCountsSerializer()


def stats_data(stats: dict[str, Any]) -> Any:
    return LeadStatsSerializer(stats).data
