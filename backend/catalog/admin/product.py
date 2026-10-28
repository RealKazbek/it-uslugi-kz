from django.contrib import admin

from catalog.models import Product, ProductFAQ


class ProductFAQInline(admin.StackedInline):
    model = ProductFAQ
    extra = 0
    fields = (
        "sort",
        "question_ru",
        "answer_ru",
        "question_kk",
        "answer_kk",
        "question_en",
        "answer_en",
    )


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("title_ru", "category", "price_from_kzt", "unit", "is_active", "sort")
    list_filter = ("category", "unit", "is_active")
    list_editable = ("is_active", "sort", "price_from_kzt")
    list_select_related = ("category",)
    search_fields = ("slug", "title_ru", "title_kk", "title_en")
    filter_horizontal = ("related",)
    readonly_fields = ("updated_at",)
    inlines = [ProductFAQInline]
    fieldsets = [
        (
            None,
            {
                "fields": (
                    "slug",
                    "category",
                    "is_active",
                    "sort",
                    "price_from_kzt",
                    "unit",
                    "days_min",
                    "days_max",
                    "related",
                    "updated_at",
                ),
            },
        ),
        ("Русский", {"fields": ("title_ru", "short_ru", "description_ru", "for_whom_ru")}),
        (
            "Что входит / не входит (ru)",
            {"fields": ("includes_ru", "not_included_ru"), "classes": ("collapse",)},
        ),
        (
            "Қазақша",
            {
                "fields": ("title_kk", "short_kk", "description_kk", "for_whom_kk"),
                "classes": ("collapse",),
            },
        ),
        (
            "Что входит / не входит (kk)",
            {"fields": ("includes_kk", "not_included_kk"), "classes": ("collapse",)},
        ),
        (
            "English",
            {
                "fields": ("title_en", "short_en", "description_en", "for_whom_en"),
                "classes": ("collapse",),
            },
        ),
        (
            "What is included / not included (en)",
            {"fields": ("includes_en", "not_included_en"), "classes": ("collapse",)},
        ),
    ]
