from django.urls import path

from core import views

urlpatterns = [
    path("health", views.health, name="health"),
    path("schema", views.SchemaView.as_view(), name="schema"),
    path("docs", views.DocsView.as_view(url_name="schema"), name="docs"),
]
