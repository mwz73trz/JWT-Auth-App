from django.urls import path, include
from rest_framework import urlpatterns
from rest_framework.routers import DefaultRouter
from jwt_app_api.views import StateViewSet, CapitalViewSet

router = DefaultRouter()
router.register("states", StateViewSet, basename="state")
router.register("capitals", CapitalViewSet, basename="capital")

urlpatterns = [
    path("", include(router.urls)),
]