from django.shortcuts import render
from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
import os
import csv
from api.models import Hospital

# Create your views here.
def importHospitals(request):
    csvFile = open(os.path.join(settings.BASE_DIR, 'api', 'csvFiles', 'hospitals.csv'))
    reader = csv.DictReader(csvFile)
    for row in reader:
        if not isinstance(row['beds'], int):
            #if number of beds not provided
            p = Hospital(name=row['name'], latitude=row['lat'], longitude=row['long'], nbBeds=0)
        else:
            p = Hospital(name=row['name'], latitude=row['lat'], longitude=row['long'], nbBeds=int(row['beds']))
        p.save()
    return HttpResponse("<h1>Imported succesfully</h1>")
