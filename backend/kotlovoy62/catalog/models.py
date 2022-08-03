from django.db import models


class Вrands(models.Model):
    title = models.CharField(
        verbose_name='Бренд',
        max_length=100,
    )
    image = models.ImageField(
        upload_to='media/images/',
        blank=True, null=True,
        verbose_name='Картинка',
    )
    display_order = models.PositiveSmallIntegerField(
        verbose_name='Порядок отображения',
    )

    class Meta:
        ordering = ('display_order', 'title')
        verbose_name = 'Бренд'
        verbose_name_plural = 'Бренды'

    def __str__(self):
        return 'Бренд: {}'.format(self.title,)


class Groups(models.Model):
    title = models.CharField(
        verbose_name='Модель/Группа',
        max_length=150,
    )

    class Meta:
        ordering = ('title',)
        verbose_name = 'Модель/Группа'
        verbose_name_plural = 'Модели/Группы'

    def __str__(self):
        return 'Группа: {}'.format(self.title,)


class Elements(models.Model):
    title = models.CharField(
        verbose_name='Название детали',
        max_length=200,
        db_index=True,
    )
    measurement_unit = models.CharField(
        verbose_name='Ед. измерения',
        max_length=30,
    )
    description = models.TextField(
        verbose_name='Описание',
        blank=True,
    )
    image = models.ImageField(
        upload_to='media/images/',
        blank=True, null=True,
        verbose_name='Картинка',
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name='Цена',
    )
    stock = models.PositiveIntegerField(
        verbose_name='Кол-во в наличии',
    )
    article = models.CharField(
        verbose_name='Артикул',
        max_length=50,
        db_index=True,
    )
    available = models.BooleanField(
        default=True,
        verbose_name='Доступность',
    )
    created = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата создания',
    )
    updated = models.DateTimeField(
        auto_now=True,
        verbose_name='Дата редактирования',
    )
    brand = models.ForeignKey(
        Вrands,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name='elements',
        verbose_name='Производитель',
    )
    groups = models.ManyToManyField(
        Groups,
        through='ElementHasGroup',
        related_name='groups'
    )

    class Meta:
        ordering = ('title',)
        verbose_name = 'Деталь'
        verbose_name_plural = 'Детали'

    def __str__(self):
        return '{}, {}'.format(self.title, self.measurement_unit)


class ElementHasGroup(models.Model):
    element = models.ForeignKey(
        Elements,
        on_delete=models.CASCADE,
        verbose_name='Деталь'
    )
    group = models.ForeignKey(
        Groups,
        on_delete=models.CASCADE,
        verbose_name='Модель/Группа'
    )

    class Meta:
        verbose_name = 'Деталь в группе'
        verbose_name_plural = 'Детали в группах'
        constraints = (
            models.UniqueConstraint(
                fields=['element', 'group'],
                name='unique elements in group value'
            ),
        )

    def __str__(self):
        return 'Деталь {} в группе {}'.format(
            self.element, self.group
        )
