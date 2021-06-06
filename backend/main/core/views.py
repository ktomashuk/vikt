from rest_framework import viewsets, permissions
from .serializers import ObjectSerializer, ContractorSerializer
from .models import Object, Contractor
from rest_framework import generics


class ObjectViewSet(viewsets.ModelViewSet):
    queryset = Object.objects.all()
    serializer_class = ObjectSerializer
    permission_classes = [permissions.IsAuthenticated]


class ContractorsView(generics.ListAPIView):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer
    permission_classes = [permissions.IsAuthenticated]


class ContractorViewSet(viewsets.ModelViewSet):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer
    permission_classes = [permissions.IsAuthenticated]


class ContractorUpdateView(generics.UpdateAPIView):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
