from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS


class IsAdminOrUserHimself(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user.is_authenticated
        )

    def has_object_permission(self, request, view, obj):
        return bool(
            request.user.is_superuser or request.user == obj
        )


class IsUserHimself(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user.is_authenticated
        )

    def has_object_permission(self, request, view, obj):
        return bool(
            request.user == obj
        )


class IsAdminOrUserHimselfAndNotSafeMethods(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.method in ('POST', 'PATCH') or
            request.user.is_superuser
        )

    def has_object_permission(self, request, view, obj):
        return bool(
            request.method in 'PATCH' and
            request.user == obj or
            request.user.is_superuser
        )
