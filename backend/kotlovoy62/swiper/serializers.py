from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers

from .models import Swiper
from catalog.custom_utils import file_delete


class SwiperSerializer(serializers.ModelSerializer):
    display_order = serializers.IntegerField(
        max_value=32767, min_value=0, default=999,
    )
    image = Base64ImageField()

    def create(self, validated_data):
        title = validated_data.get('title')
        swiper = Swiper.objects.filter(title=title)
        if swiper:
            raise serializers.ValidationError(
                detail=f'Слайд "{title}" уже существует!'
            )
        swiper = Swiper.objects.create(**validated_data)
        return swiper

    def update(self, instance, validated_data):
        new_title = validated_data.get('title', instance.title)
        if new_title:
            obj_with_new_tittle = Swiper.objects.filter(title=new_title)
            cnt_obj = len(obj_with_new_tittle)
            if cnt_obj > 0 and new_title not in instance.title:
                raise serializers.ValidationError(
                    detail=f'Слайд "{new_title}" уже существует!'
                 )

        new_image = validated_data.get('image')
        if new_image:
            file_delete(instance.image)

        instance.title = new_title
        instance.image = validated_data.get('image', instance.image)
        instance.display_order = validated_data.get(
            'display_order', instance.display_order
        )
        instance.text = validated_data.get('text', instance.text)
        instance.available = validated_data.get(
            'available', instance.available
        )
        instance.save()

        return instance

    class Meta:
        model = Swiper
        fields = (
            'id', 'title', 'image', 'text', 'created', 'available',
            'display_order',
        )
