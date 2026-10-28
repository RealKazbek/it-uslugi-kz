from rest_framework import serializers


class SlugSetsSerializer(serializers.Serializer):  # type: ignore[type-arg]
    """Slug lists for the frontend's missing-page check. Only slugs, nothing else."""

    products = serializers.ListField(child=serializers.CharField(), read_only=True)
    categories = serializers.ListField(child=serializers.CharField(), read_only=True)
    cities = serializers.ListField(child=serializers.CharField(), read_only=True)
