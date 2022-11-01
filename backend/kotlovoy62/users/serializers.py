from operator import truediv
from djoser.serializers import SetPasswordSerializer as DjSetPasswordSerializer
from djoser.serializers import UserCreateSerializer as DjUserCreateSerializer
from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    is_admin = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'id', 'email', 'username', 'first_name', 'last_name',
            'discount', 'phoneNumber', 'postal_code', 'region',
            'city', 'location', 'is_admin'
        )

    def get_is_admin(self, obj):
        return obj.is_superuser

    def update(self, instance, validated_data):
        req_user = self.context.get('request').user
        user = User.objects.filter(pk=instance.id)

        _ = validated_data.pop('email', None)
        if not req_user.is_superuser:
            validated_data.pop('discount', None)

        user.update(**validated_data)
        instance.refresh_from_db()
        return instance


class UserCreateSerializer(DjUserCreateSerializer):
    pass


class SetPasswordSerializer(DjSetPasswordSerializer):
    pass
