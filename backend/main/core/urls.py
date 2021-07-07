from django.urls import path
from . import views as core_views

urlpatterns = [
    path('contractors/',
         core_views.ContractorsView.as_view(), name='contractors'),
    path('contractor-update/<int:id>/',
         core_views.ContractorUpdateView.as_view(), name='contractor-update'),
    path('contractor-types/',
         core_views.ContractorTypeView.as_view(), name='contractor-types'),
    path('contractors-by-type/<str:type>/',
         core_views.ContractorsByTypeView.as_view(), name='contractors-by-type'),
    path('search-contractors/',
         core_views.SearchContractorsView.as_view(), name='search-contractors'),
    path('search-contractors-by-type/<str:type>/',
         core_views.SearchContractorsByTypeView.as_view(), name='search-contractors-by-type'),
    path('representatives-by-contractor/<int:contractor>/',
         core_views.RepresentativesByContractorView.as_view(), name='representatives-by-contractor'),
]
