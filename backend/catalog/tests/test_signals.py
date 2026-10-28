import pytest

from catalog.models import Category
from catalog.signals import revalidation_suppressed
from core.tests.factories import make_category, make_city, make_faq, make_product

pytestmark = pytest.mark.django_db

Recorder = list[list[str]]


@pytest.fixture
def scheduled(monkeypatch: pytest.MonkeyPatch) -> Recorder:
    calls: Recorder = []
    monkeypatch.setattr(
        "catalog.signals.schedule_revalidation",
        lambda tags: calls.append(list(tags)),
    )
    return calls


def test_product_save_schedules_product_tags(scheduled: Recorder) -> None:
    make_product(slug="landing")

    assert scheduled[-1] == ["products", "product:landing", "categories", "cities"]


def test_product_delete_schedules_product_tags(scheduled: Recorder) -> None:
    product = make_product(slug="landing")
    scheduled.clear()

    product.delete()

    assert scheduled == [["products", "product:landing", "categories", "cities"]]


def test_category_save_schedules_categories_and_products(scheduled: Recorder) -> None:
    make_category(slug="web")

    assert scheduled[-1] == ["categories", "products"]


def test_faq_save_schedules_its_product_tags(scheduled: Recorder) -> None:
    product = make_product(slug="landing")
    scheduled.clear()

    make_faq(product)

    assert scheduled == [["products", "product:landing", "categories", "cities"]]


def test_city_save_schedules_city_tags(scheduled: Recorder) -> None:
    make_city(slug="almaty")

    assert scheduled[-1] == ["cities", "city:almaty"]


def test_suppressed_block_schedules_nothing(scheduled: Recorder) -> None:
    with revalidation_suppressed():
        make_category(slug="quiet")
        make_product(slug="silent", category=Category.objects.get(slug="quiet"))

    assert scheduled == []


def test_suppression_ends_with_the_block(scheduled: Recorder) -> None:
    with revalidation_suppressed():
        pass
    make_category(slug="loud")

    assert scheduled == [["categories", "products"]]
