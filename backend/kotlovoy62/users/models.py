from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class User(AbstractUser):
    email = models.EmailField(unique=True,)
    last_name = models.CharField(max_length=100, verbose_name="Фамилия",)
    first_name = models.CharField(max_length=100, verbose_name="Имя",)
    discount = models.PositiveSmallIntegerField(
        default=0, verbose_name="Скидка, %",
    )
    phoneNumber = PhoneNumberField(
        verbose_name='Телефон', blank=True, null=True,
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

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',)
