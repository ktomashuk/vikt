from rest_framework import viewsets, permissions
from .serializers import ObjectSerializer
from .models import Object
from rest_framework import generics


class ObjectViewSet(viewsets.ModelViewSet):
    queryset = Object.objects.all()
    serializer_class = ObjectSerializer
    permission_classes = [permissions.IsAuthenticated]
