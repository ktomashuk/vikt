from django.urls import path
from . import views as estimate_views

urlpatterns = [
    path('systems-per-object/<int:id>/',
         estimate_views.SystemsPerObject.as_view(), name='system-per-object'),
    path('est-obj-sys/<int:id>/<str:system>/',
         estimate_views.EstimatesByObjectBySystemView.as_view(), name='est-obj-sys'),
    path('est-obj/<int:id>/',
         estimate_views.EstimatesByObjectView.as_view(), name='est-obj'),
    path('search-est-obj/<int:id>/',
         estimate_views.SearchEstimatesByObjectView.as_view(), name='search-est-obj'),
    path('search-est-obj-sys/<int:id>/<str:system>',
         estimate_views.SearchEstimatesByObjectBySystemView.as_view(), name='search-est-obj-sys'),
    path('est-update/<int:id>/',
         estimate_views.EstimateUpdateView.as_view(), name='est-update'),
    path('est-delete/',
         estimate_views.EstimatesDeleteView.as_view(), name='est-delete'),
    path('test/',
         estimate_views.EstimatesAddedView.as_view(), name='test'),
]
