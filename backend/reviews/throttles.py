from rest_framework.throttling import AnonRateThrottle


class ReviewBurstThrottle(AnonRateThrottle):
    """2 public review submissions per minute per client IP."""

    scope = "reviews"


class ReviewDailyThrottle(AnonRateThrottle):
    """5 public review submissions per day per client IP."""

    scope = "reviews_daily"
