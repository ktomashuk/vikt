from rest_framework import viewsets, permissions
from .serializers import InvoiceSerializer, InvoiceDetailsSerializer
from .models import Invoice, InvoiceDetails
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics


class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]


class InvoiceDetailsViewSet(viewsets.ModelViewSet):
    queryset = InvoiceDetails.objects.all()
    serializer_class = InvoiceDetailsSerializer
    permission_classes = [permissions.IsAuthenticated]


class InvoiceAllView(generics.ListAPIView):
    queryset = InvoiceDetails.objects.all()
    serializer_class = InvoiceDetailsSerializer
    permission_classes = [permissions.IsAuthenticated]