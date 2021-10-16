from .serializers import PurchaseSerializer, EstimatePurchaseQuantitySerializer, NonEstimatePurchaseQuantitySerializer
from .models import Purchase, EstimatePurchaseQuantity, NonEstimatePurchaseQuantity
from estimates.models import Estimate
from rest_framework import generics, permissions, viewsets
from rest_framework.views import APIView
from rest_framework.filters import OrderingFilter
from django.http import HttpResponse
from django.http import JsonResponse
from django.db import connection


class PurchasesViewSet(viewsets.ModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    permission_classes = [permissions.IsAuthenticated]


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


class PurchasesByEstimateItemView(generics.ListAPIView):
    serializer_class = PurchaseSerializer
    permission_classes = [permissions.IsAuthenticated]
    ordering = '__all__'

    def get_queryset(self):
        estimate_item = self.kwargs['id']
        return Purchase.objects.filter(estimate_reference=estimate_item)


class PurchasesByNonEstimateItemView(generics.ListAPIView):
    serializer_class = PurchaseSerializer
    permission_classes = [permissions.IsAuthenticated]
    ordering = '__all__'

    def get_queryset(self):
        non_estimate_item = self.kwargs['id']
        return Purchase.objects.filter(non_estimate_reference=non_estimate_item)


class PurchasesByInvoiceView(generics.ListAPIView):
    serializer_class = PurchaseSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [OrderingFilter]
    ordering = '__all__'

    def get_queryset(self):
        invoice_id = self.kwargs['id']
        return Purchase.objects.filter(invoice=invoice_id)


class PurchaseChangeEstimateQuantity(APIView):

    def get_queryset(self):
        estimate_id = self.kwargs['id']
        return EstimatePurchaseQuantity.objects.filter(estimate_reference=estimate_id)

    def post(self, request, *args, **kwargs):
        chosen_purchase = self.get_queryset()
        if not chosen_purchase:
            print('DOESNT EXIST')
        else:
            print(chosen_purchase[0].purchases_fact)
        return HttpResponse('poop')


class PurchaseCountNotReceivedAndAssigned(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        assigned_count = Purchase.objects.filter(assigned=False).count()
        received_count = Purchase.objects.filter(received=False).count()
        total_count = assigned_count + received_count
        data = {"not_assigned": assigned_count, "not_received": received_count, "not_total": total_count}
        return JsonResponse(data, safe=False)


class PurchaseCheckReceived(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        purchase_id = self.kwargs['id']
        return Purchase.objects.filter(id=purchase_id)

    def post(self, request, *args, **kwargs):
        chosen_purchase = self.get_queryset()[0]
        chosen_purchase.received = True
        chosen_purchase.save()
        return HttpResponse('done')


class PurchaseUncheckReceived(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        purchase_id = self.kwargs['id']
        return Purchase.objects.filter(id=purchase_id)

    def post(self, request, *args, **kwargs):
        chosen_purchase = self.get_queryset()[0]
        chosen_purchase.received = False
        chosen_purchase.save()
        return HttpResponse('done')


class DeletePurchasesByInvoiceView(APIView):
    serializer_class = PurchaseSerializer

    def get_queryset(self):
        invoice_id = self.kwargs['id']
        return Purchase.objects.filter(invoice=invoice_id)

    def post(self, request, *args, **kwargs):
        data = self.get_queryset()
        for item in data:
            item.delete()
        return HttpResponse('done')
