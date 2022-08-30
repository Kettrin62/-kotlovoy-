from rest_framework import filters, permissions, status, viewsets
from rest_framework.response import Response

from .models import (
    Вrand, Group, Element, ProductPhoto, ElementHasProductPhoto
)
from .serializers import (
    ВrandSerializer, GroupSerializer, ElementSerializer,
    ProductPhotoSerializer,
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


class ProductPhotosViewSet(viewsets.ModelViewSet):
    http_method_names = ('get', 'post', 'delete',)
    queryset = ProductPhoto.objects.all()
    serializer_class = ProductPhotoSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        file_delete(instance.image)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ElementViewSet(viewsets.ModelViewSet):
    queryset = Element.objects.all()
    serializer_class = ElementSerializer

    def perform_create(self, serializer):
        serializer.save(
            brand={'brand': (self.request.data['brand'])},
            images={'images': (self.request.data['images'])},
            groups={'groups': (self.request.data['groups'])},
        )

    def perform_update(self, serializer):
        element = self.get_object()
        serializer.save(
            instance=element,
            brand={'brand': (self.request.data['brand'])},
            images={'images': (self.request.data['images'])},
            groups={'groups': (self.request.data['groups'])},
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        images = ElementHasProductPhoto.objects.filter(element=instance)
        for item in images:
            file = item.photo.image
            self.perform_destroy(item.photo)
            file_delete(file)

        self.perform_destroy(instance)

        return Response(status=status.HTTP_204_NO_CONTENT)
