from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    ВrandViewSet, GroupViewSet, ElementViewSet, ProductPhotosViewSet,
)


router_v1 = DefaultRouter()
router_v1.register('brands', ВrandViewSet, basename='brands')
router_v1.register('groups', GroupViewSet, basename='groups')
router_v1.register('elements', ElementViewSet, basename='elements')
router_v1.register(
    'product_photos', ProductPhotosViewSet, basename='product_photos'
)

urlpatterns = [
    path('v1/', include(router_v1.urls)),
]
