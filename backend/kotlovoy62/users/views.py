from rest_framework import permissions, status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from kotlovoy62.settings import CUSTOM_SETTINGS_DRF
from .mixins import CreateListRetrieveViewSet
from .models import User
from .serializers import (
    SetPasswordSerializer, UserCreateSerializer, UserSerializer
)


class UserSetPagination(PageNumberPagination):
    page_size_query_param = 'limit'
    page_size = CUSTOM_SETTINGS_DRF.get('PAGE_SIZE_USERS')

class UserViewSet(CreateListRetrieveViewSet):
    queryset = User.objects.all()
    pagination_class = UserSetPagination

    def get_serializer_class(self):
        if self.action == 'set_password':
            return SetPasswordSerializer
        elif self.action == 'create':
            return UserCreateSerializer
        else:
            return UserSerializer

    @action(
        ['get'], detail=False,
        permission_classes=(permissions.IsAuthenticated,)
    )
    def me(self, request):
        user = request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data)

    @action(
        ['post'], detail=False,
        permission_classes=(permissions.IsAuthenticated,)
    )
    def set_password(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.request.user.set_password(serializer.data["new_password"])
        self.request.user.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
