from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404
from django.conf import settings
import os
import csv
from api.models import Hospital
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from api.models import Hospital
from api.serializers import HospitalSerializer

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

def hospital_list(request):
    hospitals = Hospital.objects.all()
    serializer = HospitalSerializer(hospitals, many=True)
    return JsonResponse(serializer.data, safe=False)

def hospital_detail(request, pk):
    try:
        hospital = Hospital.objects.get(pk=pk)
    except Hospital.DoesNotExist:
        raise Http404("Hospital not found")
    serializer = HospitalSerializer(hospital)
    return JsonResponse(serializer.data)
