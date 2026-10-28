import pytest

from cities.models import City

pytestmark = pytest.mark.django_db


def test_city_str_uses_russian_name() -> None:
    city = City.objects.create(
        slug="almaty",
        name_ru="Алматы",
        name_kk="Алматы",
        loc_ru="в Алматы",
        gen_ru="Алматы",
        loc_kk="Алматыда",
        attr_kk="Алматыдағы",
    )

    assert str(city) == "Алматы"
    assert city.in_person is False
    assert city.sectors_ru == []


def test_city_slug_is_unique() -> None:
    from django.db import IntegrityError, transaction

    values = {
        "name_ru": "Алматы",
        "name_kk": "Алматы",
        "loc_ru": "в Алматы",
        "gen_ru": "Алматы",
        "loc_kk": "Алматыда",
        "attr_kk": "Алматыдағы",
    }
    City.objects.create(slug="almaty", **values)

    with pytest.raises(IntegrityError), transaction.atomic():
        City.objects.create(slug="almaty", **values)
