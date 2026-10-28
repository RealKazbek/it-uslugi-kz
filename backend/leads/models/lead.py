from django.db import models

from catalog.models import Product


class Lead(models.Model):
    class Channel(models.TextChoices):
        WHATSAPP = "whatsapp", "WhatsApp"
        TELEGRAM = "telegram", "Telegram"
        PHONE = "phone", "Телефон"
        EMAIL = "email", "Email"
        OTHER = "other", "Другое"

    class Source(models.TextChoices):
        SITE = "site", "Сайт"
        BOT = "bot", "Бот"

    class Lang(models.TextChoices):
        RU = "ru", "Русский"
        KK = "kk", "Қазақша"
        EN = "en", "English"

    class Status(models.TextChoices):
        NEW = "new", "новая"
        IN_PROGRESS = "in_progress", "в работе"
        WON = "won", "выиграна"
        LOST = "lost", "проиграна"

    name = models.CharField("имя", max_length=80)
    contact = models.CharField("контакт", max_length=100)
    channel = models.CharField(
        "как ответить",
        max_length=10,
        choices=Channel.choices,
        default=Channel.OTHER,
    )
    source = models.CharField(
        "источник", max_length=10, choices=Source.choices, default=Source.SITE
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="leads",
        verbose_name="услуга",
    )
    message = models.TextField("сообщение", blank=True)
    page_url = models.URLField("страница", max_length=500, blank=True)
    lang = models.CharField("язык", max_length=2, choices=Lang.choices, default=Lang.RU)
    status = models.CharField(
        "статус",
        max_length=12,
        choices=Status.choices,
        default=Status.NEW,
        db_index=True,
    )
    telegram_user_id = models.BigIntegerField("Telegram user id", null=True, blank=True)
    created_at = models.DateTimeField("создана", auto_now_add=True, db_index=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "заявка"
        verbose_name_plural = "заявки"

    def __str__(self) -> str:
        return f"#{self.pk} {self.name} ({self.get_status_display()})"
