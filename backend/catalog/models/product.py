from django.db import models
from django.db.models import F, Q

from catalog.models.category import Category


class Product(models.Model):
    class Unit(models.TextChoices):
        ONCE = "once", "разово"
        MONTH = "month", "в месяц"
        LESSON = "lesson", "за урок"
        HOUR = "hour", "за час"

    slug = models.SlugField("slug", max_length=120, unique=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="products",
        verbose_name="категория",
    )

    title_ru = models.CharField("название (ru)", max_length=200)
    title_kk = models.CharField("название (kk)", max_length=200)
    title_en = models.CharField("название (en)", max_length=200)
    short_ru = models.TextField("кратко (ru)", blank=True)
    short_kk = models.TextField("кратко (kk)", blank=True)
    short_en = models.TextField("кратко (en)", blank=True)
    description_ru = models.TextField("описание (ru)", blank=True)
    description_kk = models.TextField("описание (kk)", blank=True)
    description_en = models.TextField("описание (en)", blank=True)
    for_whom_ru = models.TextField("для кого (ru)", blank=True)
    for_whom_kk = models.TextField("для кого (kk)", blank=True)
    for_whom_en = models.TextField("для кого (en)", blank=True)
    includes_ru = models.JSONField("что входит (ru)", default=list, blank=True)
    includes_kk = models.JSONField("что входит (kk)", default=list, blank=True)
    includes_en = models.JSONField("что входит (en)", default=list, blank=True)
    not_included_ru = models.JSONField("что не входит (ru)", default=list, blank=True)
    not_included_kk = models.JSONField("что не входит (kk)", default=list, blank=True)
    not_included_en = models.JSONField("что не входит (en)", default=list, blank=True)

    price_from_kzt = models.PositiveIntegerField("цена от, ₸")
    unit = models.CharField("единица", max_length=10, choices=Unit.choices, default=Unit.ONCE)
    days_min = models.PositiveSmallIntegerField("срок, дней от")
    days_max = models.PositiveSmallIntegerField("срок, дней до")
    related = models.ManyToManyField(
        "self",
        symmetrical=False,
        blank=True,
        verbose_name="похожие услуги",
    )
    is_active = models.BooleanField("опубликовано", default=True)
    sort = models.PositiveIntegerField("порядок", default=0, db_index=True)
    updated_at = models.DateTimeField("обновлено", auto_now=True)

    class Meta:
        ordering = ["sort", "id"]
        verbose_name = "услуга"
        verbose_name_plural = "услуги"
        constraints = [
            models.CheckConstraint(
                condition=Q(days_max__gte=F("days_min")),
                name="catalog_product_days_order",
            ),
        ]

    def __str__(self) -> str:
        return self.title_ru
