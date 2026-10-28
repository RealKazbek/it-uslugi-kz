from django.db import models

from catalog.models.product import Product


class ProductFAQ(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="faqs")
    question_ru = models.CharField("вопрос (ru)", max_length=300)
    question_kk = models.CharField("вопрос (kk)", max_length=300)
    question_en = models.CharField("вопрос (en)", max_length=300)
    answer_ru = models.TextField("ответ (ru)")
    answer_kk = models.TextField("ответ (kk)")
    answer_en = models.TextField("ответ (en)")
    sort = models.PositiveIntegerField("порядок", default=0)

    class Meta:
        ordering = ["sort", "id"]
        verbose_name = "вопрос и ответ"
        verbose_name_plural = "вопросы и ответы"

    def __str__(self) -> str:
        return self.question_ru
