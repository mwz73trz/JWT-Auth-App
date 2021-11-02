from django.urls import path, include
from rest_framework import urlpatterns
from rest_framework.routers import DefaultRouter
from jwt_app_api.views import StateViewSet, CityViewSet

router = DefaultRouter()
router.register("states", StateViewSet, basename="state")
router.register("cities", CityViewSet, basename="city")

urlpatterns = [
    path("", include(router.urls)),
]