from django.urls import path
from . import views as cable_views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('cable-obj-sys/<int:id>/<str:system>/',
         cable_views.CableJournalBySystemByObject.as_view(), name='cable-obj-sys'),
    path('cable-update/<int:id>/',
         cable_views.CableJournalUpdateView.as_view(), name='cable-update'),
    path('cable-delete/',
         cable_views.CableJournalDeleteView.as_view(), name='cable-delete'),
    path('export/<int:id>/<int:system>/',
         cable_views.ExportView.as_view(), name='export'),
    path('change-length/',
         cable_views.CableJournalSetLengthView.as_view(), name='change-length'),
    path('isolation-set/',
         cable_views.IsolationSetView.as_view(), name='isolation-set'),
    path('export-isolation-word/',
         csrf_exempt(cable_views.IsolationWordExportView.as_view()), name='export-isolation-word'),
    path('export-isolation/<int:id>/<int:system>/',
         cable_views.IsolationExportView.as_view(), name='export-isolation'),
]
