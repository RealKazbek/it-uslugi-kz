from django.urls import path

from catalog.views.categories import CategoryListView
from catalog.views.products import ProductDetailView, ProductListView

urlpatterns = [
    path("categories", CategoryListView.as_view(), name="categories"),
    path("products", ProductListView.as_view(), name="products"),
    path("products/<slug:slug>", ProductDetailView.as_view(), name="product-detail"),
]
