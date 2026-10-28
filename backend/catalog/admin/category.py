from django.contrib import admin

from catalog.models import Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name_ru", "slug", "sort")
    list_editable = ("sort",)
    search_fields = ("slug", "name_ru", "name_kk", "name_en")
    ordering = ("sort", "id")
    fieldsets = [
        (None, {"fields": ("slug", "sort")}),
        ("Русский", {"fields": ("name_ru", "short_ru", "intro_ru")}),
        ("Қазақша", {"fields": ("name_kk", "short_kk", "intro_kk"), "classes": ("collapse",)}),
        ("English", {"fields": ("name_en", "short_en", "intro_en"), "classes": ("collapse",)}),
    ]
