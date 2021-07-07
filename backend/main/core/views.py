from rest_framework import viewsets, permissions
from .serializers import ObjectSerializer, ContractorSerializer, ContractorTypeSerializer, RepresentativeSerializer
from .models import Object, Contractor, Representative
from rest_framework import generics, filters
from rest_framework.filters import OrderingFilter


class ObjectViewSet(viewsets.ModelViewSet):
    queryset = Object.objects.all()
    serializer_class = ObjectSerializer
    permission_classes = [permissions.IsAuthenticated]


class ContractorsView(generics.ListAPIView):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [OrderingFilter]
    ordering = '__all__'


class ContractorsByTypeView(generics.ListAPIView):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [OrderingFilter]
    ordering = '__all__'

    def get_queryset(self):
        contractor_type = self.kwargs['type']
        return Contractor.objects.filter(type=contractor_type)


class ContractorViewSet(viewsets.ModelViewSet):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer
    permission_classes = [permissions.IsAuthenticated]


class ContractorUpdateView(generics.UpdateAPIView):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'


class ContractorTypeView(generics.ListAPIView):
    queryset = Contractor.objects.distinct('type')
    serializer_class = ContractorTypeSerializer
    permission_classes = [permissions.IsAuthenticated]


class SearchContractorsView(generics.ListAPIView):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [OrderingFilter, filters.SearchFilter]
    ordering = '__all__'
    search_fields = ['name', ]


class SearchContractorsByTypeView(generics.ListAPIView):
    serializer_class = ContractorSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [OrderingFilter, filters.SearchFilter]
    ordering = '__all__'
    search_fields = ['name', ]

    def get_queryset(self):
        contractor_type = self.kwargs['type']
        return Contractor.objects.filter(type=contractor_type)


class RepresentativesByContractorView(generics.ListAPIView):
    serializer_class = RepresentativeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        company_id = self.kwargs['contractor']
        return Representative.objects.filter(company=company_id)