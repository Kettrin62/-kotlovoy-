from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import Вrand, Group, Element

EMPTY_VALUE = '-пусто-'


class ElementHasGroupInline(admin.TabularInline):
    model = Element.groups.through
    extra = 0


class ВrandAdmin(admin.ModelAdmin):
    list_display = ('title', 'display_image', 'display_order',)
    empty_value_display = EMPTY_VALUE
    list_editable = ('display_order',)

    def display_image(self, obj):
        return mark_safe(f'<img src={obj.image.url} width="65"  height="65">')

    display_image.__name__ = 'Изображение'


class GroupAdmin(admin.ModelAdmin):
    list_display = ('title',)
    empty_value_display = EMPTY_VALUE


class ElementAdmin(admin.ModelAdmin):
    list_display = (
        'title', 'display_image', 'price', 'stock', 'article',
        'available', 'brand', 'created', 'updated',
    )
    empty_value_display = EMPTY_VALUE
    search_fields = ('title', 'article',)
    list_filter = ('groups', 'available', 'created', 'updated',)
    list_editable = ('price', 'stock', 'available',)
    inlines = (ElementHasGroupInline,)

    def display_image(self, obj):
        return mark_safe(f'<img src={obj.image.url} width="65"  height="65">')

    display_image.__name__ = 'Изображение'


admin.site.register(Вrand, ВrandAdmin)
admin.site.register(Group, GroupAdmin)
admin.site.register(Element, ElementAdmin)
