from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import Swiper

EMPTY_VALUE = '-пусто-'


class SwiperAdmin(admin.ModelAdmin):
    list_display = (
        'title', 'display_image', 'text', 'display_order', 'available',
        'created',
    )
    empty_value_display = EMPTY_VALUE
    list_editable = ('display_order', 'available',)
    search_fields = ('title',)
    readonly_fields = ('display_image',)
    list_filter = ('available', 'created',)

    def display_image(self, obj):
        if obj.image:
            return mark_safe(
                f'<img src={obj.image.url} width="100"  height="37">'
            )
        return '(No image)'

    display_image.__name__ = 'Изображение'


admin.site.register(Swiper, SwiperAdmin)
