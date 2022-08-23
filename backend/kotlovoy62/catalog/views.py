from rest_framework import filters, permissions, status, viewsets
from rest_framework.response import Response

from .models import (
    Вrand, Group, Element,
)
from .serializers import (
    ВrandSerializer, GroupSerializer, ElementSerializer,
)
from .custom_utils import file_delete


class ВrandViewSet(viewsets.ModelViewSet):
    http_method_names = ('get', 'post', 'patch', 'delete',)
    queryset = Вrand.objects.all()
    serializer_class = ВrandSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        file_delete(instance.image)
        return Response(status=status.HTTP_204_NO_CONTENT)


class GroupViewSet(viewsets.ModelViewSet):
    http_method_names = ('get', 'post', 'patch', 'delete',)
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class ElementViewSet(viewsets.ModelViewSet):
    queryset = Element.objects.all()
    serializer_class = ElementSerializer
