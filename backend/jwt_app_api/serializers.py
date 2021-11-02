from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer
from jwt_app_api.models import State, City
from django.contrib.auth.models import User


class CitySerializer(ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'

class StateSerializer(ModelSerializer):

    user = PrimaryKeyRelatedField(queryset=User.objects.all(), many=False)
    cities = CitySerializer(many=True, required=False)

    class Meta:
        model = State
        fields = ['id', 'name', 'user', 'cities']
        depth = 1