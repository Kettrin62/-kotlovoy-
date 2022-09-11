FROM python:3.10
WORKDIR /app
COPY requirements.txt ./
RUN python3 -m pip install --upgrade pip && pip3 install -r requirements.txt --no-cache-dir
COPY kotlovoy62/. .env ./
COPY data/. ../data/
CMD ["gunicorn", "kotlovoy62.wsgi:application", "--bind", "0:8000" ]
