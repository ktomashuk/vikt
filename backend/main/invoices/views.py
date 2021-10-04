from rest_framework import viewsets, permissions, generics, filters
from .serializers import InvoiceSerializer
from .models import Invoice
from purchases.models import Purchase
from rest_framework.filters import OrderingFilter
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from django.db.models import Count


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


class InvoiceAssignmentUptick(APIView):

    def get_queryset(self):
        invoice_id = self.kwargs['id']
        return Invoice.objects.filter(id=invoice_id)

    def post(self, request, *args, **kwargs):
        chosen_invoice = self.get_queryset()[0]
        chosen_invoice.not_assigned += 1
        chosen_invoice.save()
        return Response(request.data)


class InvoiceAssignmentDowntick(APIView):

    def get_queryset(self):
        invoice_id = self.kwargs['id']
        return Invoice.objects.filter(id=invoice_id)

    def post(self, request, *args, **kwargs):
        chosen_invoice = self.get_queryset()[0]
        chosen_invoice.not_assigned -= 1
        chosen_invoice.save()
        return Response(request.data)


class InvoiceRecountAssignedAndReceived(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        invoice_id = self.kwargs['id']
        return Invoice.objects.filter(id=invoice_id)

    def post(self, request, *args, **kwargs):
        chosen_invoice = self.get_queryset()[0]
        not_assigned_count = Purchase.objects.filter(invoice=chosen_invoice.id, assigned=False).count()
        not_received_count = Purchase.objects.filter(invoice=chosen_invoice.id, received=False).count()
        chosen_invoice.not_assigned = not_assigned_count
        chosen_invoice.not_received = not_received_count
        chosen_invoice.save()
        return HttpResponse('done')
