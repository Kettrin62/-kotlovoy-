from email.policy import default

from catalog.models import Element
from django.core.validators import MinValueValidator
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from users.models import User


class Payment(models.Model):
    pay_type = models.CharField(
        verbose_name='Тип оплаты',
        max_length=100,
        unique=True
    )
    comment = models.CharField(
        verbose_name='Комментарий',
        max_length=500,
        null=True, blank=True,
    )

    class Meta:
        ordering = ('pay_type',)
        verbose_name = 'Тип оплаты'
        verbose_name_plural = 'Типы оплаты'

    def __str__(self):
        return '{}'.format(self.pay_type,)


class Delivery(models.Model):
    company = models.CharField(
        verbose_name='Название компании',
        max_length=100,
        unique=True
    )
    price = models.PositiveIntegerField(
        verbose_name='Цена доставки', default=0,
    )
    duration = models.CharField(
        verbose_name='Время доставки',
        max_length=100,
    )
    comment = models.CharField(
        verbose_name='Комментарий',
        max_length=500,
        null=True, blank=True,
    )

    class Meta:
        ordering = ('company',)
        verbose_name = 'Компания'
        verbose_name_plural = 'Логистические компании'

    def __str__(self):
        return '{}'.format(self.company,)


class OrderStatus(models.Model):
    status = models.CharField(
        verbose_name='Статус заказа',
        max_length=50,
        unique=True
    )
    comment = models.CharField(
        verbose_name='Комментарий',
        max_length=500,
        null=True, blank=True,
    )

    class Meta:
        ordering = ('status',)
        verbose_name = 'Статус заказа'
        verbose_name_plural = 'Статусы заказа'

    def __str__(self):
        return '{}'.format(self.status,)


class Order(models.Model):
    number = models.CharField(
        max_length=50, unique=True, verbose_name='Номер заказа'
    )
    created = models.DateTimeField(
        auto_now_add=True, verbose_name='Дата создания заказа',
    )
    status = models.ForeignKey(
        OrderStatus, verbose_name='Статус заказа',
        on_delete=models.SET_NULL, related_name='order_status',
        null=True,
    )
    delivery = models.ForeignKey(
        Delivery, verbose_name='Доставка',
        on_delete=models.SET_NULL, related_name='order_delivery',
        null=True,
    )
    payment = models.ForeignKey(
        Payment, verbose_name='Оплата',
        on_delete=models.SET_NULL, related_name='order_payment',
        null=True,
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
    element_sum = models.PositiveIntegerField(
        default=0, verbose_name="Стоимость товаров",
    )
    order_sum = models.PositiveIntegerField(
        default=0, verbose_name="Сумма заказа",
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
        on_delete=models.CASCADE, related_name='orders',
        blank=True, null=True,
    )
    elements = models.ManyToManyField(
        Element, through='OrderHasElement'
    )

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'

    def __str__(self):
        return 'Заказ №{}'.format(self.number)


class OrderHasElement(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='items',
        verbose_name='Заказ',
    )
    element = models.ForeignKey(
        Element,
        on_delete=models.PROTECT,
        related_name='order_items',
        verbose_name='Деталь',
    )
    price = models.PositiveIntegerField(
        verbose_name='Цена',
    )
    cur_price = models.PositiveIntegerField(
        verbose_name='Цена со скидкой',
    )
    amount = models.PositiveSmallIntegerField(
        default=1,
        verbose_name='Количество',
        validators=[MinValueValidator(
            limit_value=1, message="Минимальное значение: 1"
            )
        ],
    )

    class Meta:
        verbose_name = 'Элемент'
        verbose_name_plural = 'Элементы'

    def __str__(self):
        return '{}, {}'.format(self.order, self.element)
