from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination

from kotlovoy62.settings import CUSTOM_SETTINGS_DRF

from .models import Order
from .serializers import OrderSerializer


class OrderSetPagination(PageNumberPagination):
    page_size_query_param = 'limit'
    page_size = CUSTOM_SETTINGS_DRF.get('PAGE_SIZE_ORDERS')


class OrderViewSet(viewsets.ModelViewSet):
    http_method_names = ('get', 'post', 'patch', 'delete',)
    queryset = Order.objects.all()
    # search_fields = ('number', 'email', 'phoneNumber', 'order_sum')
    # filterset_fields = ('status', 'delivery', 'payment')
    serializer_class = OrderSerializer
    permission_classes = (AllowAny,)
    pagination_class = OrderSetPagination

    def perform_create(self, serializer):
        serializer.save(
            elements={'elements': (self.request.data['elements'])},
        )

    def perform_update(self, serializer):
        order = self.get_object()
        serializer.save(
            instance=order,
            elements={'elements': (self.request.data['elements'])},
        )

    @action(
        ['get'], detail=True,
        permission_classes=(AllowAny,)
    )
    def cancel_order(self, request, pk):
        order = Order.objects.filter(pk=pk)

        return Response(serializer.data)
