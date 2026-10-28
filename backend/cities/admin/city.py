from django.contrib import admin

from cities.models import City


@admin.register(City)
class CityAdmin(admin.ModelAdmin[City]):
    list_display = ("name_ru", "slug", "in_person", "sort")
    list_filter = ("in_person",)
    search_fields = ("slug", "name_ru", "name_kk")
    filter_horizontal = ("nearby", "product_focus")
    ordering = ("sort", "id")
    fieldsets = [
        (
            None,
            {"fields": ("slug", "sort", "in_person", "product_focus", "nearby")},
        ),
        (
            "Русский",
            {
                "fields": (
                    "name_ru",
                    "loc_ru",
                    "gen_ru",
                    "region_ru",
                    "context_ru",
                    "sectors_ru",
                    "focus_why_ru",
                ),
            },
        ),
        (
            "Қазақша",
            {
                "fields": (
                    "name_kk",
                    "loc_kk",
                    "attr_kk",
                    "region_kk",
                    "context_kk",
                    "sectors_kk",
                    "focus_why_kk",
                ),
                "classes": ("collapse",),
            },
        ),
    ]
