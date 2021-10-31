from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from jwt_app_api.serializers import StateSerializer, CapitalSerializer
from jwt_app_api.models import State, Capital

class StateViewSet(ModelViewSet):
    queryset = State.objects.all()
    serializer_class = StateSerializer

class CapitalViewSet(ModelViewSet):
    queryset = Capital.objects.all()
    serializer_class = CapitalSerializer
