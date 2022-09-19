from rest_framework import viewsets

from .models import Order
from .serializers import OrderSerializer


class OrderViewSet(viewsets.ModelViewSet):
    http_method_names = ('get', 'post', 'patch', 'delete',)
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
