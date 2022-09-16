from djoser.serializers import SetPasswordSerializer as DjSetPasswordSerializer
from djoser.serializers import UserCreateSerializer as DjUserCreateSerializer
from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id', 'email', 'username', 'first_name', 'last_name',
            'discount', 'phoneNumber', 'postal_code', 'region',
            'city', 'location'
        )


class UserCreateSerializer(DjUserCreateSerializer):
    pass


class SetPasswordSerializer(DjSetPasswordSerializer):
    pass
