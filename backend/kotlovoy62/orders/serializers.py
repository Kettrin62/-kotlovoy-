from datetime import datetime as dt

from catalog.models import Element, ProductPhoto
from rest_framework import serializers
from users.serializers import UserSerializer

from kotlovoy62.settings import MEDIA_URL

from .models import Delivery, Order, OrderHasElement, OrderStatus, Payment


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
    start_price = serializers.IntegerField(source='price')

    class Meta:
        model = OrderHasElement
        fields = (
            'element_id', 'element_title', 'element_meas_unit',
            'element_stock', 'element_price', 'element_article',
            'element_image', 'start_price', 'cur_price', 'amount',
        )

    def get_element_image(self, obj):
        request = self.context.get("request")
        image = obj.element.images.first()
        if not image:
            return '(No image)'
        return request.build_absolute_uri(MEDIA_URL + str(image.image))


class DeliverySerializer(serializers.ModelSerializer):

    class Meta:
        model = Delivery
        fields = ('id', 'company', 'price', 'duration', 'comment',)


class PaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Payment
        fields = ('id', 'pay_type', 'comment',)


class OrderStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderStatus
        fields = ('id', 'status', 'comment',)


class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    elements = serializers.SerializerMethodField()
    number = serializers.CharField(required=False)
    status = OrderStatusSerializer(read_only=True)
    delivery = DeliverySerializer(read_only=True)
    # payment = PaymentSerializer(read_only=True)

    class Meta:
        model = Order
        fields = (
            'id', 'number', 'created', 'status', 'delivery',
            'comment', 'email', 'last_name', 'first_name',
            'phoneNumber', 'discount', 'element_sum', 'order_sum',
            'postal_code', 'region', 'city', 'location', 'user', 'elements',
        )

    def get_elements(self, obj):
        elements = OrderHasElement.objects.filter(order=obj)
        request = self.context.get("request")
        return ElementForOrderSerializer(
            elements, many=True, context={'request': request}
        ).data

    def create(self, validated_data):
        status, _ = OrderStatus.objects.get_or_create(status='новый заказ')

        delivery_id = validated_data.pop('delivery')
        if delivery_id['delivery']:
            try:
                delivery_id = delivery_id['delivery']['id']
                delivery = Delivery.objects.get(pk=delivery_id)
            except BaseException:
                raise serializers.ValidationError(
                    {
                        'delivery': [
                            "Передан не правильный параметр id: "
                            f"{delivery_id}"
                        ]
                    }
                )
        else:
            raise serializers.ValidationError(
                {
                    'delivery': [
                        "Поле не может быть пустым!"
                    ]
                }
            )

        # payment_id = validated_data.pop('payment')
        # if payment_id['payment']:
        #     try:
        #         payment_id = payment_id['payment']['id']
        #         payment = Payment.objects.get(pk=payment_id)
        #     except BaseException:
        #         raise serializers.ValidationError(
        #             {
        #                 'payment': [
        #                     "Передан не правильный параметр id: "
        #                     f"{payment_id}"
        #                 ]
        #             }
        #         )
        # else:
        #     raise serializers.ValidationError(
        #         {
        #             'payment': [
        #                 "Поле не может быть пустым!"
        #             ]
        #         }
        #     )

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
                                f'кол-во заказываемых деталей {element_obj}: '
                                f'{element["amount"]} единиц(ы), '
                                f'что превышает остаток в {element_obj.stock} '
                                'единиц(ы).'
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

        elm_sum = 0
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
            elm_sum += cur_price * amount

        order.user = user
        order.number = dt.today().strftime('%H%M-%f')
        order.discount = usr_discount
        order.element_sum = elm_sum
        order.order_sum = elm_sum + delivery.price
        order.status = status
        order.delivery = delivery
        # order.payment = payment
        order.save()

        return order

    def update(self, instance, validated_data):
        order = Order.objects.filter(pk=instance.id)
        instance = validated_data.pop('instance')

        status_id = validated_data.pop('status')
        if status_id['status']:
            try:
                status_id = status_id['status']['id']
                status = OrderStatus.objects.get(pk=status_id)
            except BaseException:
                raise serializers.ValidationError(
                    {
                        'status': [
                            "Передан не правильный параметр id: "
                            f"{status_id}"
                        ]
                    }
                )
        else:
            status = instance.status

        delivery_id = validated_data.pop('delivery')
        if delivery_id['delivery']:
            try:
                delivery_id = delivery_id['delivery']['id']
                delivery = Delivery.objects.get(pk=delivery_id)
            except BaseException:
                raise serializers.ValidationError(
                    {
                        'delivery': [
                            "Передан не правильный параметр id: "
                            f"{delivery_id}"
                        ]
                    }
                )
        else:
            raise serializers.ValidationError(
                {
                    'delivery': [
                        "Поле не может быть пустым!"
                    ]
                }
            )

        # payment_id = validated_data.pop('payment')
        # if payment_id['payment']:
        #     try:
        #         payment_id = payment_id['payment']['id']
        #         payment = Payment.objects.get(pk=payment_id)
        #     except BaseException:
        #         raise serializers.ValidationError(
        #             {
        #                 'payment': [
        #                     "Передан не правильный параметр id: "
        #                     f"{payment_id}"
        #                 ]
        #             }
        #         )
        # else:
        #     raise serializers.ValidationError(
        #         {
        #             'payment': [
        #                 "Поле не может быть пустым!"
        #             ]
        #         }
        #     )

        if order.first().status.status in 'отменённый заказ':
            raise serializers.ValidationError(
                {
                    'order': [
                        'Отменённый заказ изменению не подлежит!'
                    ]
                }
            )
        if status.status in 'отменённый заказ':
            raise serializers.ValidationError(
                {
                    'order': [
                        'Для отмены заказа используйте другой эндпоинт!'
                    ]
                }
            )

        _ = validated_data.pop('number', None)
        _ = validated_data.pop('order_sum', None)
        _ = validated_data.pop('element_sum', None)

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

        old_order_elements = {}
        for item in list(OrderHasElement.objects.filter(order=instance)):
            old_order_elements[item.element] = item

        usr_discount = validated_data.get('discount', order.first().discount)
        elm_sum = 0
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
                    if order.first().status.status in [
                        'выполненный заказ', 'отменённый заказ'
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
                                f'кол-во заказываемых деталей {element.title}'
                                f': {amount} единиц(ы), что превышает '
                                f'остаток в {cnt_amount} единиц(ы).'
                            ]
                        }
                    )
                else:
                    elm_to_ord.cur_price = cur_price
                    elm_to_ord.save()

            else:
                if order.first().status.status in [
                        'выполненный заказ', 'отменённый заказ'
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
            elm_sum += cur_price * amount

        for item in old_order_elements:
            if order.first().status.status in [
                        'выполненный заказ', 'отменённый заказ'
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

        ord_sum = elm_sum + delivery.price
        order.update(
            element_sum=elm_sum,
            order_sum=ord_sum,
            status=status,
            delivery=delivery,
            # payment=payment,
            **validated_data
        )
        instance.refresh_from_db()
        return instance
