from rest_framework import serializers
from .models import Purchase, EstimatePurchaseQuantity, NonEstimatePurchaseQuantity
from estimates.models import Estimate


class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = '__all__'


class EstimatePurchaseQuantitySerializer(serializers.ModelSerializer):
    class Meta:
        model = EstimatePurchaseQuantity
        fields = '__all__'


class NonEstimatePurchaseQuantitySerializer(serializers.ModelSerializer):
    class Meta:
        model = NonEstimatePurchaseQuantity
        fields = '__all__'
