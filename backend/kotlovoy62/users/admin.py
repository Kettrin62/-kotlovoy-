from django.contrib import admin

from .models import User

EMPTY_VALUE = '-пусто-'


class UserAdmin(admin.ModelAdmin):
    list_display = (
        'username', 'email', 'date_joined', 'is_active'
    )
    empty_value_display = EMPTY_VALUE
    search_fields = ('username', 'email')
    list_filter = ('is_active',)


admin.site.register(User, UserAdmin)
