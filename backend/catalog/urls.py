from django.urls import path

from catalog.views.categories import CategoryListView
from catalog.views.products import ProductDetailView, ProductListView
from catalog.views.slugs import SlugsView

urlpatterns = [
    path("categories", CategoryListView.as_view(), name="categories"),
    path("products", ProductListView.as_view(), name="products"),
    path("products/<slug:slug>", ProductDetailView.as_view(), name="product-detail"),
    path("slugs", SlugsView.as_view(), name="slugs"),
]
