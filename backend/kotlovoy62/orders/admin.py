from django.contrib import admin, messages

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

    def delete_model(self, request, obj):
        print('************************************')
        print(obj)
        print('************************************')
        # if check_permission(obj):
        #     return super().delete_model(request, obj)
        # При следующем запросе захватываем только ошибки.
        # Так после нажатия на кнопку удаления не будет захвачено ложное сообщение
        # об успешном удалении.
        messages.set_level(request, messages.ERROR)
        message = "You cant delete this!"
        # Посылаем свое сообщение об ошибке.
        self.message_user(request, message, level=messages.ERROR)

    def delete_queryset(self, request, queryset):
        print('************************************')
        print(queryset)
        print('************************************')
        # if check_permission(obj):
        #     return super().delete_model(request, obj)
        # При следующем запросе захватываем только ошибки.
        # Так после нажатия на кнопку удаления не будет захвачено ложное сообщение
        # об успешном удалении.
        messages.set_level(request, messages.ERROR)
        message = "You cant delete this!"
        # Посылаем свое сообщение об ошибке.
        self.message_user(request, message, level=messages.ERROR)


class DeliveryAdmin(admin.ModelAdmin):
    list_display = ('company', 'price', 'comment')
    empty_value_display = EMPTY_VALUE
    list_editable = ('price',)


class PaymentAdmin(admin.ModelAdmin):
    list_display = ('pay_type', 'comment')
    empty_value_display = EMPTY_VALUE


admin.site.register(Order, OrderAdmin)
admin.site.register(OrderStatus, OrderStatusAdmin)
admin.site.register(Delivery, DeliveryAdmin)
admin.site.register(Payment, PaymentAdmin)
