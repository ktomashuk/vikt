from rest_framework import viewsets, permissions
from .serializers import ObjectSerializer, ContractorSerializer,\
    ContractorTypeSerializer, RepresentativeSerializer, SystemSerializer, UnitSerializer
from .models import Object, Contractor, Representative, System, Unit
from rest_framework import generics, filters
from rest_framework.filters import OrderingFilter
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User


class ObjectViewSet(viewsets.ModelViewSet):
    queryset = Object.objects.all()
    serializer_class = ObjectSerializer
    permission_classes = [permissions.IsAuthenticated]


class ObjectUpdateView(generics.UpdateAPIView):
    queryset = Object.objects.all()
    serializer_class = ObjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'


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


class RepresentativeViewSet(viewsets.ModelViewSet):
    queryset = Representative.objects.all()
    serializer_class = RepresentativeSerializer
    permission_classes = [permissions.IsAuthenticated]


class RepresentativeUpdateView(generics.UpdateAPIView):
    queryset = Representative.objects.all()
    serializer_class = RepresentativeSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'


class SystemsByObjectView(generics.ListAPIView):
    serializer_class = SystemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        object_id = self.kwargs['id']
        return System.objects.filter(object=object_id)


class SystemsViewSet(viewsets.ModelViewSet):
    queryset = System.objects.all()
    serializer_class = SystemSerializer
    permission_classes = [permissions.IsAuthenticated]


class SystemUpdateView(generics.UpdateAPIView):
    queryset = System.objects.all()
    serializer_class = SystemSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'


class UnitViewSet(viewsets.ModelViewSet):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer
    permission_classes = [permissions.IsAuthenticated]


class RepresentativesByObjectView(APIView):
    serializer_class = RepresentativeSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Find all contractors assigned to the chosen object
    def get_queryset(self):
        object_id = self.kwargs['id']
        return Contractor.objects.filter(object__id=object_id)

    def get(self, request, *args, **kwargs):
        contractors = self.get_queryset()
        all_representatives = []
        # For each contractor find representatives that work for that company and add to the list
        for contractor in contractors:
            contractor_id = contractor.id
            representatives = Representative.objects.filter(company=contractor_id)
            for item in representatives:
                all_representatives.append(item)
        response = Response(RepresentativeSerializer(all_representatives, many=True).data)
        return response
