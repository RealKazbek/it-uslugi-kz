from django.contrib import admin

from leads.models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin[Lead]):
    list_display = ("created_at", "name", "contact", "channel", "source", "product", "status")
    list_filter = ("status", "source", "channel", "lang", "created_at")
    list_editable = ("status",)
    list_select_related = ("product",)
    search_fields = ("name", "contact", "message")
    readonly_fields = ("created_at",)
    date_hierarchy = "created_at"
