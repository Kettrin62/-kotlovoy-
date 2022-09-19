from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import Order, OrderHasElement

EMPTY_VALUE = '-пусто-'


class OrderHasElementInline(admin.TabularInline):
    model = OrderHasElement
    raw_id_fields = ('element',)
    extra = 0


class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'number', 'last_name', 'first_name', 'status', 'comment',
        'created'
    )
    empty_value_display = EMPTY_VALUE
    list_editable = ('comment', 'status')
    search_fields = ('number', 'last_name', 'first_name')
    list_filter = (
        'status', 'created', 'updated', 'delivery', 'payment'
    )
    inlines = [OrderHasElementInline]


admin.site.register(Order, OrderAdmin)
