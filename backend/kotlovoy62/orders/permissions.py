from rest_framework import permissions

from rest_framework.permissions import SAFE_METHODS


class IsUserHimselfOrAdminWithSafeMethods(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user.is_staff
        )

    def has_object_permission(self, request, view, obj):
        return bool(
            request.user == obj.user or
            request.user.is_staff and request.method in SAFE_METHODS
        )
