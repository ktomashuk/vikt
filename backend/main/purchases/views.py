from .serializers import PurchaseSerializer, EstimatePurchaseQuantitySerializer, NonEstimatePurchaseQuantitySerializer
from .models import Purchase, EstimatePurchaseQuantity, NonEstimatePurchaseQuantity
from estimates.models import Estimate, NonEstimate
from core.models import Object
from rest_framework import generics, permissions, viewsets
from rest_framework.views import APIView
from rest_framework.filters import OrderingFilter
from django.http import HttpResponse
from django.http import JsonResponse
from django.db import connection
from django.core import serializers


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

    def get(self, request, *args, **kwargs):
        purchases = self.get_queryset().select_related('invoice')
        final_json = []
        for item in purchases:
            contractor_name = item.invoice.contractor.name
            invoice_date = item.invoice.inv_date
            purchase_id = item.id
            purchased_doc = item.purchased_doc
            units = item.units.name
            price = item.price
            name = item.ware_name
            invoice_id = item.invoice.id
            json_chunk = {'purchase_id': purchase_id,
                          'contractor_name': contractor_name,
                          'inv_date': invoice_date,
                          'purchased_doc': purchased_doc,
                          "units": units,
                          "name": name,
                          "price": price,
                          "invoice_id": invoice_id}
            final_json.append(json_chunk)
        return JsonResponse(final_json, safe=False)


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
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        invoice_id = self.kwargs['id']
        return Purchase.objects.filter(invoice=invoice_id)

    def post(self, request, *args, **kwargs):
        data = self.get_queryset()
        for item in data:
            quantity_doc = item.purchased_doc
            quantity_fact = item.purchased_fact
            # Find a purchase quantity and decrease it if it exists
            if item.estimate_reference:
                item_id = item.estimate_reference.id
                purchase = EstimatePurchaseQuantity.objects.filter(estimate_reference=item_id)[0]
                purchase.purchases_doc = purchase.purchases_doc - quantity_doc
                purchase.purchases_fact = purchase.purchases_fact - quantity_fact
                purchase.save()
            if item.non_estimate_reference:
                item_id = item.non_estimate_reference.id
                purchase = NonEstimatePurchaseQuantity.objects.filter(non_estimate_reference=item_id)[0]
                purchase.purchases_doc = purchase.purchases_doc - quantity_doc
                purchase.purchases_fact = purchase.purchases_fact - quantity_fact
                purchase.save()
            item.delete()
        return HttpResponse('done')


class EstimatePurchaseQuantityChange(APIView):
    serializer_class = EstimatePurchaseQuantitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        request_data = request.data
        purchase_type = request_data['bind_type']
        est_id = request_data['bind']
        obj_id = request_data['object']
        pur_fact = float(request_data['fact'])
        pur_doc = float(request_data['doc'])
        # Changing estimate purchase quantity
        if purchase_type == 'estimate':
            quantity = EstimatePurchaseQuantity.objects.filter(estimate_reference=est_id)
            if not quantity:
                est_reference = Estimate.objects.filter(id=est_id)[0]
                obj_reference = Object.objects.filter(id=obj_id)[0]
                new_quantity = EstimatePurchaseQuantity(estimate_reference=est_reference, object=obj_reference,
                                                        purchases_fact=pur_fact, purchases_doc=pur_doc)
                new_quantity.save()
            else:
                changed_quantity = quantity[0]
                changed_quantity.purchases_fact = changed_quantity.purchases_fact + pur_fact
                changed_quantity.purchases_doc = changed_quantity.purchases_doc + pur_doc
                changed_quantity.save()
        # Changing non estimate purchase quantity
        if purchase_type == 'nonestimate':
            quantity = NonEstimatePurchaseQuantity.objects.filter(non_estimate_reference=est_id)
            if not quantity:
                est_reference = NonEstimate.objects.filter(id=est_id)[0]
                obj_reference = Object.objects.filter(id=obj_id)[0]
                new_quantity = NonEstimatePurchaseQuantity(non_estimate_reference=est_reference, object=obj_reference,
                                                           purchases_fact=pur_fact, purchases_doc=pur_doc)
                new_quantity.save()
            else:
                changed_quantity = quantity[0]
                changed_quantity.purchases_fact = changed_quantity.purchases_fact + pur_fact
                changed_quantity.purchases_doc = changed_quantity.purchases_doc + pur_doc
                changed_quantity.save()

        return HttpResponse('done')


class GetPurchaseReferenceById(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        purchase_id = self.kwargs['id']
        return Purchase.objects.filter(id=purchase_id)

    def get(self, request, *args, **kwargs):
        purchase = self.get_queryset()[0]
        purchase_estimate = purchase.estimate_reference
        purchase_nonestimate = purchase.non_estimate_reference
        reference_name = ''
        if not purchase_estimate and not purchase_nonestimate:
            reference_name = 'Нет'
        elif purchase_estimate:
            reference_name = purchase_estimate.ware +\
                             ' (' + purchase_estimate.system.acronym + ' ' + purchase_estimate.object.name + ')'
        elif purchase_nonestimate:
            reference_name = purchase_nonestimate.ware + \
                             ' (' + purchase_nonestimate.system.acronym + ' ' + purchase_nonestimate.object.name + ')'
        return HttpResponse(reference_name)


class GetInvoicesDetailsByEstimateReference(APIView):

    def get_queryset(self):
        estimate_reference = self.kwargs['id']
        return Purchase.objects.filter(estimate_reference=estimate_reference)

    def get(self, request, *args, **kwargs):
        purchases = self.get_queryset().select_related('invoice')
        final_json = []
        for item in purchases:
            contractor_name = item.invoice.contractor.name
            invoice_date = item.invoice.inv_date
            purchase_id = item.id
            purchased_doc = item.purchased_doc
            units = item.units.name
            price = item.price
            name = item.ware_name
            json_chunk = {'purchase_id': purchase_id,
                          'contractor_name': contractor_name,
                          'inv_date': invoice_date,
                          'purchased_doc': purchased_doc,
                          "units": units,
                          "name": name,
                          "price": price}
            final_json.append(json_chunk)
        return JsonResponse(final_json, safe=False)


class PurchaseShippedChange(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        request_data = request.data
        purchase_type = request_data['type']
        est_id = request_data['id']
        quantity = request_data['quantity']
        if purchase_type == 'estimate':
            purchases = EstimatePurchaseQuantity.objects.filter(estimate_reference=est_id)
            chosen_purchase = purchases[0]
            chosen_purchase.shipped = chosen_purchase.shipped + quantity
            chosen_purchase.save()
        if purchase_type == 'nonestimate':
            purchases = NonEstimatePurchaseQuantity.objects.filter(non_estimate_reference=est_id)
            chosen_purchase = purchases[0]
            chosen_purchase.shipped = chosen_purchase.shipped + quantity
            chosen_purchase.save()
        return HttpResponse('done')


class DeletePurchase(APIView):
    serializer_class = PurchaseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        purchase_id = self.kwargs['id']
        return Purchase.objects.filter(id=purchase_id)

    def post(self, request, *args, **kwargs):
        purchase = self.get_queryset()[0]
        quantity_doc = purchase.purchased_doc
        quantity_fact = purchase.purchased_fact
        # Find a purchase quantity and decrease it if it exists
        if purchase.estimate_reference:
            item_id = purchase.estimate_reference.id
            to_delete = EstimatePurchaseQuantity.objects.filter(estimate_reference=item_id)[0]
            to_delete.purchases_doc = to_delete.purchases_doc - quantity_doc
            to_delete.purchases_fact = to_delete.purchases_fact - quantity_fact
            to_delete.save()
        if purchase.non_estimate_reference:
            item_id = purchase.non_estimate_reference.id
            to_delete = NonEstimatePurchaseQuantity.objects.filter(non_estimate_reference=item_id)[0]
            to_delete.purchases_doc = to_delete.purchases_doc - quantity_doc
            to_delete.purchases_fact = to_delete.purchases_fact - quantity_fact
            to_delete.save()
        purchase.delete()
        return HttpResponse('done')


class PurchasesByEstimateItemViewNew(APIView):

    def get_queryset(self):
        estimate_item = self.kwargs['id']
        return Purchase.objects.filter(estimate_reference=estimate_item).select_related('')