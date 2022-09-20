from datetime import datetime as dt

from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import AnonymousUser
from rest_framework.validators import UniqueValidator
from rest_framework import serializers

from .models import Order, OrderHasElement
from catalog.models import Element
from users.models import User
from users.serializers import UserSerializer
from catalog.serializers import ElementSerializer


class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    elements = ElementSerializer(many=True, read_only=True)
    number = serializers.CharField(required=False)

    class Meta:
        model = Order
        fields = (
            'id', 'number', 'created', 'updated', 'status', 'delivery',
            'payment', 'comment', 'email', 'last_name', 'first_name',
            'phoneNumber', 'discount', 'order_sum', 'postal_code', 'region',
            'city', 'location', 'user', 'elements',
        )

    def create(self, validated_data):
        order_elements = validated_data.pop('elements')
        validated_elements = set()
        if order_elements['elements']:
            for element in order_elements['elements']:
                try:
                    element_obj = Element.objects.get(pk=element['id'])
                    validated_elements.add(
                        (element_obj, element['amount']),
                    )
                except BaseException:
                    raise serializers.ValidationError(
                        {
                            'elements': [
                                f'Передан не правильный параметр: {element}'
                            ]
                        }
                    )
        else:
            raise serializers.ValidationError(
                        {
                            'elements': [
                                'Заказ не может быть оформлен пустым!'
                            ]
                        }
                    )

        user = self.context.get('request').user
        usr_discount = 0
        if not user.is_authenticated:
            user = None
        else:
            usr_discount = user.discount

        order = Order.objects.create(**validated_data)

        ord_sum = 0
        for element, amount in validated_elements:
            cur_price = element.price - round(
                element.price * usr_discount / 100
            )
            OrderHasElement.objects.create(
                order=order,
                element=element,
                price=element.price,
                cur_price=cur_price,
                amount=amount
            )
            ord_sum += cur_price * amount

        order.user = user
        order.number = dt.today().strftime('%H%M-%f')
        order.discount = usr_discount
        order.order_sum = ord_sum
        order.save()

        return order

    def update(self, instance, validated_data):
        images = validated_data.pop('images')
        validated_images = []
        if images['images']:
            for image in images['images']:
                try:
                    img_obj = ProductPhoto.objects.get(pk=image['id'])
                    validated_images.append(img_obj)
                except BaseException:
                    raise serializers.ValidationError(
                        {
                            'images': [
                                f'Передан не правильный параметр: {image}'
                            ]
                        }
                    )

        groups = validated_data.pop('groups')
        validated_groups = []
        if groups['groups']:
            for group in groups['groups']:
                try:
                    group_obj = Group.objects.get(pk=group['id'])
                    validated_groups.append(group_obj)
                except BaseException:
                    raise serializers.ValidationError(
                        {
                            'groups': [
                                f'Передан не правильный параметр: {group}'
                            ]
                        }
                    )

        brand_id = validated_data.pop('brand')
        if brand_id['brand']:
            try:
                brand_id = brand_id['brand']['id']
                brand = Вrand.objects.get(pk=brand_id)
            except Вrand.DoesNotExist:
                raise serializers.ValidationError(
                    {
                        'brand': [
                            "Передан не правильный параметр: "
                            f"{brand_id['brand']}"
                        ]
                    }
                )
        else:
            brand = None

        element = Element.objects.filter(pk=instance.id)
        instance = validated_data.pop('instance')
        element.update(**validated_data)

        old_images = [item[0] for item in instance.images.values_list('id')]
        old_groups = [item[0] for item in instance.groups.values_list('id')]

        for image in validated_images:
            if image.id in old_images:
                old_images.remove(image.id)
            else:
                ElementHasProductPhoto.objects.get_or_create(
                    element=instance, photo=image
                )
        for image_id in old_images:
            del_elem_img = ElementHasProductPhoto.objects.filter(
                element=instance.id, photo=image_id
            )
            try:
                del_image = ProductPhoto.objects.get(pk=image_id)
            except ObjectDoesNotExist as err:
                print(
                    f'В БД запись таблицы "ProductPhoto" с pk={image_id} '
                    'не обнаружена, в процессе выполнения кода возникло '
                    f'исключение: {err}'
                )
            else:
                del_file = del_image.image
                del_image.delete()
                file_delete(del_file)
            finally:
                del_elem_img.delete()

        for group in validated_groups:
            if group.id in old_groups:
                old_groups.remove(group.id)
            else:
                ElementHasGroup.objects.get_or_create(
                    element=instance, group=group
                )
        for group_id in old_groups:
            del_elem_group = ElementHasGroup.objects.filter(
                element=instance.id, group=group_id
            )
            del_elem_group.delete()

        if brand:
            element.update(brand=brand)
        else:
            element.update(brand=None)

        instance.refresh_from_db()
        return instance
