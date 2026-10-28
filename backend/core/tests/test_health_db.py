from unittest import mock

from django.db import DatabaseError

from core.services.health import database_is_available


def test_database_is_available_false_when_cursor_fails() -> None:
    with mock.patch("django.db.connection.cursor", side_effect=DatabaseError("down")):
        assert database_is_available() is False
