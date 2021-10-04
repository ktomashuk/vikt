from django.urls import path
from . import views as invoices_views

urlpatterns = [
    path('invoices-by-date/',
         invoices_views.InvoiceSortedByDateView.as_view(), name='invoices-by-date'),
    path('search-invoices/',
         invoices_views.InvoiceSearch.as_view(), name='search-invoices'),
    path('invoice-uptick/<int:id>/',
         invoices_views.InvoiceAssignmentUptick.as_view(), name='invoice-uptick'),
    path('invoice-downtick/<int:id>/',
         invoices_views.InvoiceAssignmentDowntick.as_view(), name='invoice-downtick'),
    path('invoice-recount-all/<int:id>/',
         invoices_views.InvoiceRecountAssignedAndReceived.as_view(), name='invoice-recount-all'),
]