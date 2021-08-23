from rest_framework import viewsets, permissions
from .serializers import InvoiceSerializer
from .models import Invoice


class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]
