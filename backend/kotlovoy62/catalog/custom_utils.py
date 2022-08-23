import os
from pathlib import Path


MEDIA_DIR = (
    str(Path(__file__).resolve().parent.parent) + os.sep + 'media' + os.sep
)


def file_delete(f_path):
    file_path = MEDIA_DIR + str(f_path)
    if os.path.isfile(file_path):
        os.remove(file_path)
    else:
        print(
            f'Не удалось удалить файл по пути: {file_path}, файл не доступен!'
        )
