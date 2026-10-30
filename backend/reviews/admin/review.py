from django.contrib import admin

from reviews.models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin[Review]):
    list_display = ("created_at", "name", "company", "city", "rating", "locale", "is_approved")
    list_filter = ("is_approved", "rating", "locale")
    list_editable = ("is_approved",)
    search_fields = ("name", "company", "text")
    readonly_fields = ("created_at",)
