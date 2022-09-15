from django.contrib import admin
from django.contrib.auth.models import Group

from .models import User

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
    exclude = ('is_superuser', 'is_staff', 'groups', 'user_permissions', )


admin.site.register(User, UserAdmin)
admin.site.unregister(Group)
