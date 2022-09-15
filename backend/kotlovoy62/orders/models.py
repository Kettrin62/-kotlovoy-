from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

ORDER_STATUS = (
        ('order_is_completed', 'заказ выполнен'),
        ('order_in_progress', 'заказ на этапе выполнения'),
        ('order_in_progress', 'заказ на этапе выполнения'),
        ('order_asks_details', 'заказ требует уточнений'),
        ('new_order', 'новый заказ'),
        ('order_cancelled', 'заказ отменён'),
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
