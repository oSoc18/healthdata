#!/bin/bash

pip install -r requirements.txt
exec python manage.py runserver 0.0.0.0:8000
