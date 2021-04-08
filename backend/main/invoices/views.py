from rest_framework import viewsets, permissions
from .serializers import InvoiceSerializer, InvoiceDetailsSerializer
from .models import Invoice, InvoiceDetails
from rest_framework.views import APIView
from rest_framework.response import Response


class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]


class InvoiceDetailsViewSet(viewsets.ModelViewSet):
    queryset = InvoiceDetails.objects.all()
    serializer_class = InvoiceDetailsSerializer
    permission_classes = [permissions.IsAuthenticated]


class InvoiceAllView(APIView):

    def get(self, request, format=None):
        invoice_list = [invoice.number for invoice in Invoice.objects.all()]

        return Response(invoice_list)

