from datetime import datetime as dt

from django.core.exceptions import ObjectDoesNotExist
from drf_extra_fields.fields import Base64ImageField
from django.contrib.auth.models import AnonymousUser
from rest_framework.validators import UniqueValidator
from rest_framework import serializers

from kotlovoy62.settings import MEDIA_URL
from .models import Order, OrderHasElement
from catalog.models import Element, ElementHasProductPhoto, ProductPhoto
from users.models import User
from users.serializers import UserSerializer


class ProductPhotoForOrderSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True, max_length=None,)

    class Meta:
        model = ProductPhoto
        fields = ('image',)

    def get_image_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url)


class ElementForOrderSerializer(serializers.ModelSerializer):
    element_id = serializers.ReadOnlyField(
        source='element.id', read_only=True
    )
    element_title = serializers.ReadOnlyField(
        source='element.title', read_only=True
    )
    element_meas_unit = serializers.ReadOnlyField(
        source='element.measurement_unit', read_only=True
    )
    element_stock = serializers.ReadOnlyField(
        source='element.stock', read_only=True
    )
    element_price = serializers.ReadOnlyField(
        source='element.price', read_only=True
    )
    element_article = serializers.ReadOnlyField(
        source='element.article', read_only=True
    )
    element_image = serializers.SerializerMethodField()
    old_price = serializers.IntegerField(source='element.price')

    class Meta:
        model = OrderHasElement
        fields = (
            'element_id', 'element_title', 'element_meas_unit',
            'element_stock', 'element_price', 'element_article',
            'element_image', 'old_price', 'cur_price', 'amount',
        )

    def get_element_image(self, obj):
        request = self.context.get("request")
        image = obj.element.images.first()
        return request.build_absolute_uri(MEDIA_URL + str(image.image))


class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    elements = serializers.SerializerMethodField()
    number = serializers.CharField(required=False)

    class Meta:
        model = Order
        fields = (
            'id', 'number', 'created', 'updated', 'status', 'delivery',
            'payment', 'comment', 'email', 'last_name', 'first_name',
            'phoneNumber', 'discount', 'order_sum', 'postal_code', 'region',
            'city', 'location', 'user', 'elements',
        )

    def get_elements(self, obj):
        elements = OrderHasElement.objects.filter(order=obj)
        request = self.context.get("request")
        return ElementForOrderSerializer(
            elements, many=True, context={'request': request}
        ).data

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
                if element_obj.stock < element['amount']:
                    raise serializers.ValidationError(
                        {
                            'elements': [
                                f'кол-во заказываемых деталей: "{element_obj}"'
                                f' составило {element["amount"]} единиц, '
                                f'что превышает остаток в {element_obj.stock} '
                                'единиц.'
                            ]
                        }
                    )
                element_obj.stock = element_obj.stock - element['amount']
                element_obj.save()
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
        status = validated_data.get('status', 'status is missing')
        if status in 'order_cancelled':
            raise serializers.ValidationError(
                {
                    'order': [
                        'Для отмены заказа используйте другой эндпоинт!'
                    ]
                }
            )

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
                                'Заказ не может быть пустым!'
                            ]
                        }
                    )

        order = Order.objects.filter(pk=instance.id)

        instance = validated_data.pop('instance')

        #old_elements = list(instance.elements.all())
        #old_order_elements = list(OrderHasElement.objects.filter(order=instance))

        old_order_elements = {}
        for item in list(OrderHasElement.objects.filter(order=instance)):
            old_order_elements[item.element] = item
        #order.update(**validated_data)

        usr_discount = validated_data.get('discount', order.first().discount)
        print('-----------> ', usr_discount)
        ord_sum = 0
        for element, amount in validated_elements:
            if element in old_order_elements:
                elm_to_ord = old_order_elements.pop(element)

                cur_price = elm_to_ord.price - round(
                    elm_to_ord.price * usr_discount / 100
                )

                cnt_amount = element.stock + elm_to_ord.amount
                if (
                    elm_to_ord.amount != amount and
                    amount <= cnt_amount
                ):
                    if order.first().status in [
                        'order_is_completed', 'order_cancelled'
                    ]:
                        raise serializers.ValidationError(
                            {
                                'order': [
                                    'Нельзя менять состав выполненного '
                                    'или отменённого заказа!'
                                ]
                            }
                        )
                    delta = elm_to_ord.amount - amount
                    element.stock += delta
                    element.save()
                    elm_to_ord.amount = amount
                    elm_to_ord.cur_price = cur_price
                    elm_to_ord.save()

                elif amount > cnt_amount:
                    raise serializers.ValidationError(
                        {
                            'elements': [
                                f'кол-во заказываемых деталей: "{amount}"'
                                f' {element.title} единиц, что превышает '
                                f'остаток в {cnt_amount} единиц.'
                            ]
                        }
                    )
                else:
                    #old_order_elements[element] = elm_to_ord
                    pass
            else:
                if order.first().status in [
                        'order_is_completed', 'order_cancelled'
                ]:
                    raise serializers.ValidationError(
                        {
                            'order': [
                                'Нельзя менять состав выполненного '
                                'или отменённого заказа!'
                            ]
                        }
                    )
                cur_price = element.price - round(
                    element.price * usr_discount / 100
                )
                OrderHasElement.objects.create(
                    order=instance,
                    element=element,
                    price=element.price,
                    cur_price=cur_price,
                    amount=amount
                )
            ord_sum += cur_price * amount

        for item in old_order_elements:
            if order.first().status in [
                        'order_is_completed', 'order_cancelled'
            ]:
                raise serializers.ValidationError(
                    {
                        'order': [
                            'Нельзя менять состав выполненного '
                            'или отменённого заказа!'
                        ]
                    }
                )
            old_order_elements[item].delete()

        order.update(order_sum=ord_sum, **validated_data)
        instance.refresh_from_db()
        return instance
