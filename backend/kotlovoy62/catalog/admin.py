from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import Вrand, Group, Element, ProductPhoto

EMPTY_VALUE = '-пусто-'


class ElementHasGroupInline(admin.TabularInline):
    model = Element.groups.through
    extra = 0


class ElementHasProductPhotoInline(admin.TabularInline):
    model = Element.images.through
    extra = 0
    readonly_fields = ('display_image', 'display_order_render')
    show_change_link = True

    def display_image(self, obj):
        if obj.photo.image:
            return mark_safe(
                f'<img src={obj.photo.image.url} width="65"  height="65">'
            )
        return '(No image)'

    def display_order_render(self, obj):
        return mark_safe(f'{obj.photo.display_order}')

    display_image.__name__ = 'Изображение'
    display_order_render.__name__ = 'Порядок отображения'


class ВrandAdmin(admin.ModelAdmin):
    list_display = ('title', 'display_image', 'display_order',)
    empty_value_display = EMPTY_VALUE
    list_editable = ('display_order',)
    search_fields = ('title',)
    readonly_fields = ('display_image',)

    def display_image(self, obj):
        if obj.image:
            return mark_safe(
                f'<img src={obj.image.url} width="65"  height="65">'
            )
        return '(No image)'

    display_image.__name__ = 'Изображение'


class GroupAdmin(admin.ModelAdmin):
    list_display = ('title',)
    empty_value_display = EMPTY_VALUE


class ElementAdmin(admin.ModelAdmin):
    list_display = (
        'title', 'article', 'display_image', 'brand', 'price',
        'stock', 'available',
    )
    empty_value_display = EMPTY_VALUE
    search_fields = ('title', 'article',)
    list_filter = ('brand', 'groups', 'available', 'created', 'updated',)
    list_editable = ('price', 'stock', 'available',)
    inlines = (ElementHasGroupInline, ElementHasProductPhotoInline)

    def display_image(self, obj):
        if obj.images.first():
            return mark_safe(
                f'<img src={obj.images.first().image.url} '
                'width="65"  height="65">'
            )
        return '(No image)'

    display_image.__name__ = 'Изображение'


class ProductPhotoAdmin(admin.ModelAdmin):
    list_display = ('display_image',)
    empty_value_display = EMPTY_VALUE

    def display_image(self, obj):
        if obj.image:
            return mark_safe(
                f'<img src={obj.image.url} width="65"  height="65">'
            )
        return '(No image)'

    display_image.__name__ = 'Изображение'


admin.site.register(Вrand, ВrandAdmin)
admin.site.register(Group, GroupAdmin)
admin.site.register(Element, ElementAdmin)
admin.site.register(ProductPhoto, ProductPhotoAdmin)
