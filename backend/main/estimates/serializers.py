from rest_framework import serializers
from .models import Estimate, NonEstimate


class EstimateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estimate
        fields = '__all__'


class SystemPerObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estimate
        fields = ('system', )


class WareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estimate
        fields = ('ware', )


class NonEstimateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NonEstimate
        fields = '__all__'
