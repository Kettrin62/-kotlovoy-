from django.contrib.auth.models import AbstractUser
from django.core.mail import send_mail
from django.db import models
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from phonenumber_field.modelfields import PhoneNumberField

from kotlovoy62.settings import DEFAULT_FROM_EMAIL


class User(AbstractUser):
    email = models.EmailField(unique=True,)
    last_name = models.CharField(
        max_length=100, verbose_name="Фамилия", blank=True, null=True,
    )
    first_name = models.CharField(
        max_length=100, verbose_name="Имя", blank=True, null=True,
    )
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


@receiver(reset_password_token_created)
def password_reset_token_created(
    sender, instance, reset_password_token, *args, **kwargs
):
    email_plaintext_message = (
        'Кто-то пытается изменить ваш пароль на сайте Kotlovoy62.ru\nЕсли '
        'это были не Вы, то просто проигнорируйте данное письмо.\nЕсли это Вы '
        'инициировали сброс пароля, на сайте заполните форму восстановления '
        'пароля.\n'
        f'Введите данный код: {reset_password_token.key} и новый '
        'пароль в соответсвующие поля.'
    )

    send_mail(
        # title:
        "Сброс пароля на сайте Kotlovoy62.ru",
        # message:
        email_plaintext_message,
        # from:
        DEFAULT_FROM_EMAIL,
        # to:
        [reset_password_token.user.email]
    )
