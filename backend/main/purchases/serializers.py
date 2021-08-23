from rest_framework import serializers
from .models import Purchase
from estimates.models import Estimate


class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = '__all__'


class FullSerializer(serializers.Serializer):
    ware = serializers.CharField()
    quantity = serializers.FloatField()