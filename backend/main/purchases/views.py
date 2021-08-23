from .serializers import PurchaseSerializer, FullSerializer
from .models import Purchase
from estimates.models import Estimate
from rest_framework import generics, permissions
from rest_framework.views import APIView


class PurchasesView(generics.ListAPIView):
    serializer_class = PurchaseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Purchase.objects.all().prefetch_related('ware_reference')
