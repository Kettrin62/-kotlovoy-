from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from users.models import User
from catalog.models import Element

ORDER_STATUS = (
        ('order_is_completed', 'заказ выполнен'),
        ('order_in_progress', 'заказ на этапе выполнения'),
        ('order_in_progress', 'заказ на этапе выполнения'),
        ('order_asks_details', 'заказ требует уточнений'),
        ('new_order', 'новый заказ'),
        ('order_cancelled', 'заказ отменён'),
    )

DELIVERY = (
    ('SDEK', 'СДЭК'),
    ('Yandex', 'Яндекс'),
    ('Russian_post', 'Почта России'),
)

PAYMENT = (
    ('by_fact', 'при получении'),
    ('online', 'онлайн'),
    ('cashless', 'безналичный расчет'),
)


class Order(models.Model):
    number = models.CharField(
        max_length=50, unique=True, verbose_name='Номер заказа'
    )
    created = models.DateTimeField(
        auto_now_add=True, verbose_name='Дата создания заказа',
    )
    updated = models.DateTimeField(
        auto_now=True, verbose_name='Дата редактирования заказа',
    )
    status = models.CharField(
        max_length=50, choices=ORDER_STATUS, default='new_order',
        verbose_name='Статус заказа',
    )
    delivery = models.CharField(
        max_length=50, choices=DELIVERY, default='SDEK',
        verbose_name='Доставка',
    )
    payment = models.CharField(
        max_length=50, choices=PAYMENT, default='by_fact',
        verbose_name='Оплата',
    )
    comment = models.CharField(
        max_length=250, blank=True, null=True, verbose_name='Комментарий',
    )
    email = models.EmailField(
        verbose_name='Электронная почта', blank=True, null=True,
    )
    last_name = models.CharField(
        max_length=100, verbose_name="Фамилия",
    )
    first_name = models.CharField(
        max_length=100, verbose_name="Имя",
    )
    phoneNumber = PhoneNumberField(
        verbose_name='Телефон',
    )
    discount = models.PositiveSmallIntegerField(
        default=0, verbose_name="Скидка, %",
    )
    postal_code = models.CharField(
        max_length=20, blank=True, null=True, verbose_name='Индекс',
    )
    region = models.CharField(
        max_length=100, blank=True, null=True, verbose_name='Область',
    )
    city = models.CharField(
        max_length=100, blank=True, null=True,
        verbose_name='Населенный пункт',
    )
    location = models.CharField(
        max_length=200, blank=True, null=True,
        verbose_name='Улица, дом, квартира',
    )
    user = models.ForeignKey(
        User, verbose_name='Пользователь',
        on_delete=models.RESTRICT, related_name='orders',
        blank=True, null=True,
    )

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='items',
        verbose_name='Заказ',
    )
    element = models.ForeignKey(
        Element,
        on_delete=models.SET_NULL,
        null=True,
        related_name='order_items',
        verbose_name='Деталь',
    )
    price = models.PositiveIntegerField(
        verbose_name='Цена',
    )
    cur_price = models.PositiveIntegerField(
        verbose_name='Цена со скидкой',
    )
    quantity = models.PositiveIntegerField(
        default=1,
        verbose_name='Количество',
    )

    class Meta:
        verbose_name = 'Элемент'
        verbose_name_plural = 'Элементы'

    def __str__(self):
        return '{}'.format(self.element)

    def get_cost(self):
        return self.cur_price * self.quantity
