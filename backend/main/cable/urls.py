from django.urls import path
from . import views as cable_views

urlpatterns = [
    path('cable-obj-sys/<int:id>/<str:system>/',
         cable_views.CableJournalBySystemByObject.as_view(), name='cable-obj-sys'),
    path('cable-update/<int:id>/',
         cable_views.CableJournalUpdateView.as_view(), name='cable-update'),
    path('cable-delete/',
         cable_views.CableJournalDeleteView.as_view(), name='cable-delete'),
    path('export/<int:id>/<str:system>/',
         cable_views.ExportView.as_view(), name='export'),
    path('change-length/',
         cable_views.CableJournalSetLengthView.as_view(), name='change-length'),
    path('isolation-set/',
         cable_views.IsolationSetView.as_view(), name='isolation-set'),
]