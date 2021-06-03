from rest_framework import serializers
from .models import Purchase
from estimates.models import Estimate


class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = '__all__'


class FullSerializer(serializers.ModelSerializer):
    purchase = PurchaseSerializer(many=True, read_only=True)

    class Meta:
        model = Estimate
        fields = ('purchase', 'ware', 'system', 'object', 'quantity')
