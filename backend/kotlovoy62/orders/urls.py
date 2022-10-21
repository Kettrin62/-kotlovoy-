from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    OrderViewSet, PaymentViewSet, DeliveryViewSet, OrderStatusViewSet,
)


router_v1 = DefaultRouter()
router_v1.register('orders', OrderViewSet, basename='orders')
router_v1.register('delivery', DeliveryViewSet, basename='delivery')
router_v1.register('payment', PaymentViewSet, basename='payment')
router_v1.register(
    'order_status', OrderStatusViewSet, basename='order_status'
)

urlpatterns = [
    path('v1/', include(router_v1.urls)),
]
