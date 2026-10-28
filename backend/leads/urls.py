from django.urls import path

from leads.views.internal_detail import InternalLeadDetailView
from leads.views.internal_leads import InternalLeadsView
from leads.views.internal_stats import InternalStatsView
from leads.views.public import PublicLeadView

urlpatterns = [
    path("leads", PublicLeadView.as_view(), name="leads"),
    path("internal/leads", InternalLeadsView.as_view(), name="internal-leads"),
    path(
        "internal/leads/<int:id>",
        InternalLeadDetailView.as_view(),
        name="internal-lead-detail",
    ),
    path("internal/stats", InternalStatsView.as_view(), name="internal-stats"),
]
