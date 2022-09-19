from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import Order, OrderItem

EMPTY_VALUE = '-пусто-'


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ('element',)
    extra = 0


class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'number', 'last_name', 'first_name', 'status', 'comment',
        'created'
    )
    empty_value_display = EMPTY_VALUE
    list_editable = ('comment', 'status')
    search_fields = ('number', '')
    list_filter = ('status', 'created', 'updated',)
    inlines = [OrderItemInline]


admin.site.register(Order, OrderAdmin)
