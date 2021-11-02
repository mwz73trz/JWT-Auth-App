from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from jwt_app_api.serializers import StateSerializer, CitySerializer
from jwt_app_api.models import State, City

class StateViewSet(ModelViewSet):
    queryset = State.objects.all()
    serializer_class = StateSerializer

class CityViewSet(ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
