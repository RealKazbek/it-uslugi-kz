"""Slug format shared by categories and products. Short enough for bot callback data."""

from django.core.validators import RegexValidator

SLUG_PATTERN = r"^[a-z0-9-]{1,59}\Z"

slug_format = RegexValidator(
    regex=SLUG_PATTERN,
    message="Slug: lowercase letters, digits and hyphens, 1 to 59 characters.",
)
