from django.db import models

from catalog.models import Product


class City(models.Model):
    slug = models.SlugField("slug", max_length=80, unique=True)
    name_ru = models.CharField("название (ru)", max_length=100)
    name_kk = models.CharField("название (kk)", max_length=100)
    loc_ru = models.CharField("предложный падеж (ru), «в Алматы»", max_length=120)
    gen_ru = models.CharField("родительный падеж (ru), «Алматы»", max_length=120)
    loc_kk = models.CharField("местный падеж (kk), «Алматыда»", max_length=120)
    attr_kk = models.CharField("определение (kk), «Алматыдағы»", max_length=120)
    region_ru = models.CharField("статус региона (ru)", max_length=200, blank=True)
    region_kk = models.CharField("статус региона (kk)", max_length=200, blank=True)
    context_ru = models.TextField("контекст рынка (ru)", blank=True)
    context_kk = models.TextField("контекст рынка (kk)", blank=True)
    sectors_ru = models.JSONField("отрасли (ru)", default=list, blank=True)
    sectors_kk = models.JSONField("отрасли (kk)", default=list, blank=True)
    focus_why_ru = models.JSONField(
        "почему подходит, по услугам (ru), ключ — slug услуги", default=dict, blank=True
    )
    focus_why_kk = models.JSONField(
        "почему подходит, по услугам (kk), ключ — slug услуги", default=dict, blank=True
    )
    product_focus = models.ManyToManyField(
        Product,
        blank=True,
        related_name="cities",
        verbose_name="услуги в приоритете",
    )
    nearby = models.ManyToManyField(
        "self",
        symmetrical=False,
        blank=True,
        verbose_name="соседние города",
    )
    in_person = models.BooleanField("работа очно", default=False)
    sort = models.PositiveIntegerField("порядок", default=0, db_index=True)

    class Meta:
        ordering = ["sort", "id"]
        verbose_name = "город"
        verbose_name_plural = "города"

    def __str__(self) -> str:
        return self.name_ru
