from django.urls import path
from . import views as purchase_views

urlpatterns = [
    path('test/',
         purchase_views.PurchasesView.as_view(), name='test'),
]
