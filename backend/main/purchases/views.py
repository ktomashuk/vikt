from .serializers import PurchaseSerializer, EstimatePurchaseQuantitySerializer, NonEstimatePurchaseQuantitySerializer
from .models import Purchase, EstimatePurchaseQuantity, NonEstimatePurchaseQuantity
from estimates.models import Estimate, NonEstimate
from core.models import Object
from rest_framework import generics, permissions
from rest_framework.views import APIView
from django.http import HttpResponse
from django.db.models import Prefetch
from django.db import connection


class PurchasesView(APIView):
    serializer_class = PurchaseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        est_test = Estimate.objects.select_related('object').values()
        test2 = est_test[2]
        print(test2)
        print(connection.queries)
        return HttpResponse('POOP')


class EstimatesByObjectView(generics.ListAPIView):
    serializer_class = EstimatePurchaseQuantitySerializer
    permission_classes = [permissions.IsAuthenticated]
    ordering = '__all__'

    def get_queryset(self):
        object_id = self.kwargs['id']
        return EstimatePurchaseQuantity.objects.filter(object=object_id)


class NonEstimatesByObjectView(generics.ListAPIView):
    serializer_class = NonEstimatePurchaseQuantitySerializer
    permission_classes = [permissions.IsAuthenticated]
    ordering = '__all__'

    def get_queryset(self):
        object_id = self.kwargs['id']
        return NonEstimatePurchaseQuantity.objects.filter(object=object_id)
