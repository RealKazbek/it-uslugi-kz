from django.db import models


class Category(models.Model):
    slug = models.SlugField("slug", max_length=80, unique=True)
    name_ru = models.CharField("название (ru)", max_length=120)
    name_kk = models.CharField("название (kk)", max_length=120)
    name_en = models.CharField("название (en)", max_length=120)
    short_ru = models.TextField("кратко (ru)", blank=True)
    short_kk = models.TextField("кратко (kk)", blank=True)
    short_en = models.TextField("кратко (en)", blank=True)
    intro_ru = models.TextField("вступление (ru)", blank=True)
    intro_kk = models.TextField("вступление (kk)", blank=True)
    intro_en = models.TextField("вступление (en)", blank=True)
    sort = models.PositiveIntegerField("порядок", default=0, db_index=True)

    class Meta:
        ordering = ["sort", "id"]
        verbose_name = "категория"
        verbose_name_plural = "категории"

    def __str__(self) -> str:
        return self.name_ru
