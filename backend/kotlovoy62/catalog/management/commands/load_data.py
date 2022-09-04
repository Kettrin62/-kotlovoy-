import csv
from os import path
from shutil import copytree, ignore_patterns, rmtree

from django.core.management.base import BaseCommand

from catalog.models import Вrand


class Command(BaseCommand):
    help = 'Загрузка данных в БД'

    def handle(self, *args, **options):

        with open('../data/loading_data/brands/brands_data.csv') as file:
            file_data = csv.reader(file, delimiter=';')
            for item in file_data:
                title, image, display_order = item
                Вrand.objects.get_or_create(
                    title=title, image=image, display_order=display_order
                )

        if path.exists('media/images'):
            rmtree('media/images')
        copytree(
            '../data/loading_data/brands/', 'media/images/',
            ignore=ignore_patterns('*.csv',)
        )
