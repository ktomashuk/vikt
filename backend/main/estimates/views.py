from rest_framework import viewsets, permissions
from .serializers import EstimateSerializer, SystemPerObjectSerializer
from .models import Estimate
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter


class EstimateViewSet(viewsets.ModelViewSet):
    queryset = Estimate.objects.all()
    serializer_class = EstimateSerializer
    permission_classes = [permissions.IsAuthenticated]


class EstimateUpdateView(generics.UpdateAPIView):
    queryset = Estimate.objects.all()
    serializer_class = EstimateSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'


class SystemsPerObject(generics.ListAPIView):
    serializer_class = SystemPerObjectSerializer

    def get_queryset(self):
        object_id = self.kwargs['id']
        return Estimate.objects.filter(object=object_id)


class EstimatesByObjectBySystemView(generics.ListAPIView):
    serializer_class = EstimateSerializer
    filter_backends = [OrderingFilter]
    ordering = '__all__'

    def get_queryset(self):
        object_id = self.kwargs['id']
        system_name = self.kwargs['system']
        return Estimate.objects.filter(object=object_id, system=system_name)


class EstimatesByObjectView(generics.ListAPIView):
    serializer_class = EstimateSerializer
    filter_backends = [OrderingFilter]
    ordering = '__all__'

    def get_queryset(self):
        object_id = self.kwargs['id']
        return Estimate.objects.filter(object=object_id)


class SearchEstimatesByObjectView(generics.ListAPIView):
    serializer_class = EstimateSerializer
    filter_backends = [OrderingFilter, filters.SearchFilter]
    ordering = '__all__'
    search_fields = ['ware', ]

    def get_queryset(self):
        object_id = self.kwargs['id']
        return Estimate.objects.filter(object=object_id)


class SearchEstimatesByObjectBySystemView(generics.ListAPIView):
    serializer_class = EstimateSerializer
    filter_backends = [OrderingFilter, filters.SearchFilter]
    ordering = '__all__'
    search_fields = ['ware', ]

    def get_queryset(self):
        object_id = self.kwargs['id']
        system_name = self.kwargs['system']
        return Estimate.objects.filter(object=object_id, system=system_name)