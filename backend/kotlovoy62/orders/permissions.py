from rest_framework import permissions


class UserGetAndCreateOnlyOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user.is_superuser or
            request.user.is_authenticated
        )

    def has_object_permission(self, request, view, obj):
        return bool(
            request.user == obj.user and
            request.method in ('GET', 'POST',) or
            request.user.is_superuser
        )
