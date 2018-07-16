from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
import os
import csv
import json
from api.models import Hospital
from rest_framework.renderers import JSONRenderer

def importHospitals(request):
    csvFile = open(os.path.join(settings.BASE_DIR, 'api', 'csvFiles', 'hospitals.csv'))
    reader = csv.DictReader(csvFile)
    for row in reader:
        if not isInt(row['beds']):
            #if number of beds not provided
            p = Hospital(name=row['name'], latitude=row['lat'], longitude=row['long'], nbBeds=0)
        else:
            p = Hospital(name=row['name'], latitude=row['lat'], longitude=row['long'], nbBeds=int(row['beds']))
        p.save()
    return HttpResponse("<h1>Imported Successfully</h1>")

def isInt(value):
    try:
        int(value)
        return True
    except:
        return False
