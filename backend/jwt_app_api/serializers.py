from rest_framework.serializers import ModelSerializer, StringRelatedField
from jwt_app_api.models import State, Capital

class StateSerializer(ModelSerializer):
    class Meta:
        model = State
        fields = ['id', 'name', 'user', 'capitals']
        depth = 1

    user = StringRelatedField()

class CapitalSerializer(ModelSerializer):
    class Meta:
        model = Capital
        fields = '__all'