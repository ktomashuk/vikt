from django.urls import path
from . import views as invoices_views

urlpatterns = [
    path('invoices-by-date/',
         invoices_views.InvoiceSortedByDateView.as_view(), name='invoices-by-date'),
    path('search-invoices/',
         invoices_views.InvoiceSearch.as_view(), name='search-invoices'),
]
