from rest_framework import serializers

from core.serializers.lang import LangQuery


class ProductListQuery(LangQuery):
    category = serializers.CharField(required=False, allow_blank=True, max_length=80)
