from rest_framework import status, viewsets
from rest_framework.response import Response

from .models import Swiper
from catalog.permissions import IsAdminOrReadOnly
from .serializers import SwiperSerializer
from catalog.custom_utils import file_delete


class SwiperViewSet(viewsets.ModelViewSet):
    http_method_names = ('get', 'post', 'patch', 'delete',)
    queryset = Swiper.objects.all()
    serializer_class = SwiperSerializer
    permission_classes = (IsAdminOrReadOnly,)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        file_delete(instance.image)
        return Response(status=status.HTTP_204_NO_CONTENT)
