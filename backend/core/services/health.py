import logging

from django.db import DatabaseError, connection

logger = logging.getLogger(__name__)


def database_is_available() -> bool:
    """Run a trivial query; log and report False when the database cannot answer."""
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            cursor.fetchone()
    except DatabaseError:
        logger.exception("Health check failed: database is unavailable")
        return False
    return True
