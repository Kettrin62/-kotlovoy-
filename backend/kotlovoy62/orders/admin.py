from django.contrib import admin, messages

from kotlovoy62.settings import CANT_DELETE_STATUS

from .models import Order, OrderHasElement, OrderStatus, Delivery, Payment

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
        'status', 'created', 'delivery', 'payment'
    )
    inlines = [OrderHasElementInline]


class OrderStatusAdmin(admin.ModelAdmin):
    list_display = ('status', 'comment')
    empty_value_display = EMPTY_VALUE

    def save_model(self, request, obj, form, change):
        if obj.status in CANT_DELETE_STATUS:
            messages.set_level(request, messages.ERROR)
            message = 'Вы не можете изменять предустановленный статус заказа!'
            self.message_user(request, message, level=messages.ERROR)
        else:
            return super().save_model(request, obj, form, change)

    def delete_model(self, request, obj):
        if obj.status in CANT_DELETE_STATUS:
            messages.set_level(request, messages.ERROR)
            message = 'Вы не можете удалить предустановленный статус заказа!'
            self.message_user(request, message, level=messages.ERROR)
        else:
            return super().delete_model(request, obj)

    def delete_queryset(self, request, queryset):
        for item in queryset:
            if item.status in CANT_DELETE_STATUS:
                messages.set_level(request, messages.ERROR)
                message = (
                    'Вы не можете удалять предустановленные статусы заказа!'
                )
                self.message_user(request, message, level=messages.ERROR)
                break
        else:
            return super().delete_model(request, queryset)


class DeliveryAdmin(admin.ModelAdmin):
    list_display = ('company', 'price', 'duration', 'comment')
    empty_value_display = EMPTY_VALUE
    list_editable = ('price', 'duration')


class PaymentAdmin(admin.ModelAdmin):
    list_display = ('pay_type', 'comment')
    empty_value_display = EMPTY_VALUE


admin.site.register(Order, OrderAdmin)
admin.site.register(OrderStatus, OrderStatusAdmin)
admin.site.register(Delivery, DeliveryAdmin)
admin.site.register(Payment, PaymentAdmin)
