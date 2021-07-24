from rest_framework import viewsets, permissions, status
from .serializers import EstimateSerializer, SystemPerObjectSerializer
from .models import Estimate
from rest_framework import generics, filters
from rest_framework.filters import OrderingFilter
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum


class EstimateViewSet(viewsets.ModelViewSet):
    queryset = Estimate.objects.all()
    serializer_class = EstimateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class EstimateUpdateView(generics.UpdateAPIView):
    queryset = Estimate.objects.all()
    serializer_class = EstimateSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'


class SystemsPerObject(generics.ListAPIView):
    serializer_class = SystemPerObjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        object_id = self.kwargs['id']
        return Estimate.objects.filter(object=object_id)


class EstimatesByObjectBySystemView(generics.ListAPIView):
    serializer_class = EstimateSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [OrderingFilter]
    ordering = '__all__'

    def get_queryset(self):
        object_id = self.kwargs['id']
        system_name = self.kwargs['system']
        return Estimate.objects.filter(object=object_id, system=system_name)


class EstimatesByObjectView(generics.ListAPIView):
    serializer_class = EstimateSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [OrderingFilter]
    ordering = '__all__'

    def get_queryset(self):
        object_id = self.kwargs['id']
        return Estimate.objects.filter(object=object_id)


class SearchEstimatesByObjectView(generics.ListAPIView):
    serializer_class = EstimateSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [OrderingFilter, filters.SearchFilter]
    ordering = '__all__'
    search_fields = ['ware', ]

    def get_queryset(self):
        object_id = self.kwargs['id']
        return Estimate.objects.filter(object=object_id)


class SearchEstimatesByObjectBySystemView(generics.ListAPIView):
    serializer_class = EstimateSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [OrderingFilter, filters.SearchFilter]
    ordering = '__all__'
    search_fields = ['ware', ]

    def get_queryset(self):
        object_id = self.kwargs['id']
        system_name = self.kwargs['system']
        return Estimate.objects.filter(object=object_id, system=system_name)


class EstimatesAddedView(generics.ListAPIView):
    queryset = Estimate.objects.annotate(total=Sum('quantity')).order_by('ware')
    serializer_class = EstimateSerializer
    permission_classes = [permissions.IsAuthenticated]


class EstimatesDeleteView(APIView):
    serializer_class = EstimateSerializer

    def post(self, request, *args, **kwargs):
        est_data = request.data
        for i in est_data:
            Estimate.objects.filter(id=i).delete()
        return Response(request.data)