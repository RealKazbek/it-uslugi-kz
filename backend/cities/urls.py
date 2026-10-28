from django.urls import path

from cities.views.cities import CityDetailView, CityListView

urlpatterns = [
    path("cities", CityListView.as_view(), name="cities"),
    path("cities/<slug:slug>", CityDetailView.as_view(), name="city-detail"),
]
