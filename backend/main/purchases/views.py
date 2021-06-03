from django.shortcuts import render
from .serializers import PurchaseSerializer, FullSerializer
from .models import Purchase
from estimates.models import Estimate
from rest_framework import generics, permissions


class PurchasesView(generics.ListAPIView):
    serializer_class = FullSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        estimates = Estimate.objects.all()
        purchases = Purchase.objects.all()
        return estimates, purchases
