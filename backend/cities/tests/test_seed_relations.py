import pytest

from catalog.services.seed import seed_all
from cities.models import City

pytestmark = pytest.mark.django_db


def test_almaty_nearby_and_product_focus_after_seed() -> None:
    seed_all()

    almaty = City.objects.get(slug="almaty")

    assert set(almaty.nearby.values_list("slug", flat=True)) == {
        "konaev",
        "taldykorgan",
        "zharkent",
    }
    assert almaty.product_focus.count() == 6
