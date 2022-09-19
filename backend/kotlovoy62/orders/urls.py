from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import OrderViewSet


router_v1 = DefaultRouter()
router_v1.register('orders', OrderViewSet, basename='orders')

urlpatterns = [
    path('v1/', include(router_v1.urls)),
]
