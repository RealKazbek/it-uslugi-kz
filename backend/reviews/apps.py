import importlib

from django.apps import AppConfig


class ReviewsConfig(AppConfig):
    name = "reviews"

    def ready(self) -> None:
        importlib.import_module("reviews.signals")
