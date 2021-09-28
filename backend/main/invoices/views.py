from rest_framework import viewsets, permissions, generics, filters
from .serializers import InvoiceSerializer
from .models import Invoice
from rest_framework.filters import OrderingFilter


class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]


class InvoiceSortedByDateView(generics.ListAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [OrderingFilter]
    ordering = '__all__'


class InvoiceSearch(generics.ListAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [OrderingFilter, filters.SearchFilter]
    ordering = '__all__'
    search_fields = ['inv_date', 'number', 'contractor__name', ]
