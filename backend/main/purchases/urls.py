from django.urls import path
from . import views as purchase_views

urlpatterns = [
    path('test/',
         purchase_views.PurchasesView.as_view(), name='test'),
    path('estimate-purchases-by-object/<int:id>/',
         purchase_views.EstimatesByObjectView.as_view(), name='estimate-purchases-by-object'),
    path('nonestimate-purchases-by-object/<int:id>/',
         purchase_views.NonEstimatesByObjectView.as_view(), name='nonestimate-purchases-by-object'),
]
