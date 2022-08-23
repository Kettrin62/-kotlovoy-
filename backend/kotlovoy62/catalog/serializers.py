from drf_extra_fields.fields import Base64ImageField
from rest_framework import status
from rest_framework import serializers
from rest_framework.generics import get_object_or_404

from .models import (
    Вrand, Group, Element,
)
from .custom_utils import file_delete


class ВrandSerializer(serializers.ModelSerializer):
    display_order = serializers.IntegerField(
        max_value=32767, min_value=0, default=999,
    )
    image = Base64ImageField()

    def create(self, validated_data):
        title = validated_data.get('title')
        brand = Вrand.objects.filter(title=title)
        if brand:
            raise serializers.ValidationError(
                detail=f'Бренд "{title}" уже существует!'
            )
        brand = Вrand.objects.create(**validated_data)
        return brand

    def update(self, instance, validated_data):
        new_title = validated_data.get('title', instance.title)
        if new_title:
            obj_with_new_tittle = Вrand.objects.filter(title=new_title)
            cnt_obj = len(obj_with_new_tittle)
            if cnt_obj > 0 and new_title not in instance.title:
                raise serializers.ValidationError(
                    detail=f'Бренд "{new_title}" уже существует!'
                 )

        new_image = validated_data.get('image')
        if new_image:
            file_delete(instance.image)

        instance.title = new_title
        instance.image = validated_data.get('image', instance.image)
        instance.display_order = validated_data.get(
            'display_order', instance.display_order
        )
        instance.save()

        return instance

    class Meta:
        model = Вrand
        fields = ('id', 'title', 'image', 'display_order',)


class GroupSerializer(serializers.ModelSerializer):
    title = serializers.CharField(
        max_length=150,
        trim_whitespace=True
    )

    def create(self, validated_data):
        title = validated_data.get('title')
        group = Group.objects.filter(title=title)
        if group:
            raise serializers.ValidationError(
                detail=f'Группа "{title}" уже существует!'
            )
        group = Group.objects.create(**validated_data)
        return group

    def update(self, instance, validated_data):
        new_title = validated_data.get('title', instance.title)
        if new_title:
            obj_with_new_tittle = Group.objects.filter(title=new_title)
            cnt_obj = len(obj_with_new_tittle)
            if cnt_obj > 0 and new_title not in instance.title:
                raise serializers.ValidationError(
                    detail=f'Группа "{new_title}" уже существует!'
                 )

        instance.title = new_title
        instance.save()
        return instance

    class Meta:
        model = Group
        fields = ('id', 'title',)


class ElementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Element
        fields = (
            'title', 'measurement_unit', 'description', 'image', 'price',
            'stock', 'article', 'available', 'created', 'created',
        )
