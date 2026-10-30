from django.db import models


class Review(models.Model):
    class Locale(models.TextChoices):
        RU = "ru", "Русский"
        KK = "kk", "Қазақша"
        EN = "en", "English"

    name = models.CharField("имя", max_length=80)
    company = models.CharField("компания", max_length=120, blank=True)
    city = models.CharField("город", max_length=80, blank=True)
    rating = models.PositiveSmallIntegerField("оценка (1-5)")
    text = models.TextField("текст", max_length=2000)
    locale = models.CharField("язык", max_length=2, choices=Locale.choices, default=Locale.RU)
    is_approved = models.BooleanField("опубликован", default=False)
    created_at = models.DateTimeField("создан", auto_now_add=True)

    class Meta:
        ordering = ["-created_at", "-id"]
        verbose_name = "отзыв"
        verbose_name_plural = "отзывы"
        constraints = [
            models.CheckConstraint(
                condition=models.Q(rating__gte=1, rating__lte=5),
                name="reviews_review_rating_range",
            ),
        ]

    def __str__(self) -> str:
        return f"{self.name} ({self.rating}/5)"
