from django.contrib import admin

from .models import User, Address

EMPTY_VALUE = '-пусто-'


class UserAdmin(admin.ModelAdmin):
    list_display = (
        'username', 'email', 'phoneNumber', 'discount',
        'is_active', 'date_joined'
    )
    empty_value_display = EMPTY_VALUE
    search_fields = ('username', 'email')
    list_filter = ('is_active', 'date_joined')
    list_editable = ('is_active', 'discount')


class AddressAdmin(admin.ModelAdmin):
    list_display = (
        'postal_code', 'region', 'city', 'location', 'created'
    )
    empty_value_display = EMPTY_VALUE
    search_fields = ('postal_code', 'city')
    list_filter = ('created',)


admin.site.register(User, UserAdmin)
admin.site.register(Address, AddressAdmin)
