from django.urls import path

from reviews.views.reviews import ReviewListView

urlpatterns = [path("reviews", ReviewListView.as_view(), name="reviews")]
