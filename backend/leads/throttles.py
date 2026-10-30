from rest_framework.throttling import AnonRateThrottle


class LeadHourlyThrottle(AnonRateThrottle):
    """5 public lead submissions per hour per client IP."""

    scope = "leads"


class LeadDailyThrottle(AnonRateThrottle):
    """30 public lead submissions per day per client IP."""

    scope = "leads_daily"
