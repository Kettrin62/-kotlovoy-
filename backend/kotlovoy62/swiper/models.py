from django.db import models


class Swiper(models.Model):
    title = models.CharField(
        max_length=70,
        verbose_name='Название слайда',
    )
    text = models.CharField(
        max_length=260,
        verbose_name='Текст слайда',
    )
    image = models.ImageField(
        upload_to='images/',
        verbose_name='Картинка сайда',
    )
    created = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата создания слайда',
    )
    available = models.BooleanField(
        default=True,
        verbose_name='Отображение слайда',
        null=True,
    )
    display_order = models.PositiveSmallIntegerField(
        verbose_name='Порядок отображения слайда',
    )

    class Meta:
        ordering = ('display_order',)
        verbose_name = 'Слайд'
        verbose_name_plural = 'Слайды'
        constraints = (
            models.UniqueConstraint(
                fields=['title'],
                name='unique swiper value'
            ),
        )

    def __str__(self):
        return self.title
