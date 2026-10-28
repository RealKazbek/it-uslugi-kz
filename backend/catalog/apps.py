import importlib

from django.apps import AppConfig


class CatalogConfig(AppConfig):
    name = "catalog"

    def ready(self) -> None:
        importlib.import_module("catalog.signals")
