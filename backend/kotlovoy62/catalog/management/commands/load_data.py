import csv
from os import path
from shutil import copyfile, copytree, ignore_patterns, rmtree

from catalog.models import (Element, ElementHasGroup, ElementHasProductPhoto,
                            Group, ProductPhoto, Вrand)
from django.core.management.base import BaseCommand
from orders.models import OrderStatus


class Command(BaseCommand):
    help = 'Загрузка данных в БД'

    def handle(self, *args, **options):

        with open(
            '../data/loading_data/brands/brands_data.csv', encoding='utf8',
        ) as file:
            file_data = csv.reader(file, delimiter=';')
            for item in file_data:
                title, image, display_order = item
                Вrand.objects.get_or_create(
                    title=title, image=image, display_order=display_order
                )

        with open(
            '../data/loading_data/groups/groups_data.csv', encoding='utf8',
        ) as file:
            file_data = csv.reader(file, delimiter=';')
            for item in file_data:
                title, = item
                Group.objects.get_or_create(title=title)

        with open(
            '../data/loading_data/orders_status/orders_status_data.csv',
            encoding='utf8',
        ) as file:
            file_data = csv.reader(file, delimiter=';')
            for item in file_data:
                status, comment = item
                OrderStatus.objects.get_or_create(
                    status=status, comment=comment
                )

        ###########################################################
        # for testing
        with open(
            '../data/loading_data/elements/elements_data.csv', encoding='utf8',
        ) as file:
            file_data = csv.reader(file, delimiter=';')
            for item in file_data:
                title, unit, description, price, stock, article, brand = item
                brand_obj = Вrand.objects.get(id=brand)
                Element.objects.get_or_create(
                    title=title, measurement_unit=unit,
                    description=description, price=price, stock=stock,
                    article=article, brand=brand_obj,
                )
        with open(
            '../data/loading_data/elements/photos_data.csv', encoding='utf8',
        ) as file:
            file_data = csv.reader(file, delimiter=';')
            for item in file_data:
                image, display_order = item
                ProductPhoto.objects.get_or_create(
                    image=image, display_order=display_order,
                )
        with open(
            '../data/loading_data/elements/ElementHasGroup_data.csv',
            encoding='utf8',
        ) as file:
            file_data = csv.reader(file, delimiter=';')
            for item in file_data:
                element, group = item
                element_obj = Element.objects.get(id=element)
                group_obj = Group.objects.get(id=group)
                ElementHasGroup.objects.get_or_create(
                    element=element_obj, group=group_obj,
                )
        with open(
            '../data/loading_data/elements/ElementHasProductPhoto_data.csv',
            encoding='utf8',
        ) as file:
            file_data = csv.reader(file, delimiter=';')
            for item in file_data:
                element, photo = item
                element_obj = Element.objects.get(id=element)
                photo_obj = ProductPhoto.objects.get(id=photo)
                ElementHasProductPhoto.objects.get_or_create(
                    element=element_obj, photo=photo_obj,
                )
        #
        ###########################################################

        if path.exists('media/brands'):
            rmtree('media/brands')
        copytree(
            '../data/loading_data/brands/', 'media/brands/',
            ignore=ignore_patterns('*.csv',)
        )

        copyfile(
            '../data/loading_data/pattern.xlsx', 'media/pattern.xlsx',
        )

        ###########################################################
        # for testing
        if path.exists('media/elements'):
            rmtree('media/elements')
        copytree(
            '../data/loading_data/elements/', 'media/elements/',
            ignore=ignore_patterns('*.csv',), dirs_exist_ok=True
        )
        #
        ###########################################################
