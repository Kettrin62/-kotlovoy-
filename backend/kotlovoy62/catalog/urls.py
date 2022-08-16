from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ВrandViewSet, GroupViewSet, ElementViewSet


router = DefaultRouter()
router.register('brands', ВrandViewSet, basename='brands')
router.register('groups', GroupViewSet, basename='groups')
router.register('elements', ElementViewSet, basename='elements')

urlpatterns = [
    path('', include(router.urls)),
]
