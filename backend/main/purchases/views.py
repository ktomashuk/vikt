from .serializers import PurchaseSerializer, FullSerializer
from .models import Purchase
from estimates.models import Estimate
from rest_framework import generics, permissions
from rest_framework.views import APIView
from django.http import HttpResponse


class PurchasesView(APIView):
    serializer_class = FullSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        qs = Estimate.objects.filter(purchase__isnull=False).values_list('ware', flat=True)
        print(qs.values())

        return HttpResponse('POOP')

