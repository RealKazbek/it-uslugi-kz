from rest_framework.throttling import AnonRateThrottle


class LeadBurstThrottle(AnonRateThrottle):
    """5 public lead submissions per minute per client IP."""

    scope = "leads"


class LeadDailyThrottle(AnonRateThrottle):
    """30 public lead submissions per day per client IP."""

    scope = "leads_daily"
