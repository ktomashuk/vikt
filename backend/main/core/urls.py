from django.urls import path
from . import views as core_views

urlpatterns = [
    path('contractors/',
         core_views.ContractorsView.as_view(), name='contractors'),
    path('contractor-update/<int:id>/',
         core_views.ContractorUpdateView.as_view(), name='contractor-update'),
]
