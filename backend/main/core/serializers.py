from rest_framework import serializers
from .models import Object, Contractor, Representative


class ObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Object
        fields = ('id', 'name')


class ContractorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contractor
        fields = '__all__'


class ContractorTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contractor
        fields = ['type', ]


class RepresentativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Representative
        fields = '__all__'
