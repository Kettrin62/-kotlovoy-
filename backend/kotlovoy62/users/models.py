from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class User(AbstractUser):
    email = models.EmailField(unique=True,)
    last_name = models.CharField(max_length=100, verbose_name="Фамилия",)
    first_name = models.CharField(max_length=100, verbose_name="Имя",)
    discount = models.PositiveSmallIntegerField(
        default=1, verbose_name="Скидка, %",
    )
    phoneNumber = PhoneNumberField(
        verbose_name='Телефон', blank=True, null=True,
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username', 'first_name', 'last_name',)


class Address(models.Model):
    postal_code = models.CharField(
        max_length=20, blank=True, null=True, verbose_name='Индекс',
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True,
        related_name='addresses', verbose_name='Адреса',
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
    created = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата создания',
    )
    updated = models.DateTimeField(
        auto_now=True,
        verbose_name='Дата редактирования',
    )

    class Meta:
        verbose_name = 'Адрес'
        verbose_name_plural = 'Адреса'
        constraints = (
            models.UniqueConstraint(
                fields=['city', 'location'],
                name='unique address value'
            ),
        )

    def __str__(self):
        return '{}, {}, {}, {}'.format(
            self.postal_code, self.region, self.city, self.location
        )
