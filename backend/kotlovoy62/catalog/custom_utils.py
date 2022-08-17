import re

from rest_framework import serializers


def check_uuid(func):
    def wrapper(request, *args, **kwargs):
        uuid = None
        if kwargs:
            uuid = kwargs.get('id')
        if not uuid and args:
            d_args = dict(args[0])
            uuid = d_args.get('id')
        if uuid:
            if re.match(r'^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$', uuid):
                return func(request, *args, **kwargs)
        raise serializers.ValidationError()
    return wrapper
