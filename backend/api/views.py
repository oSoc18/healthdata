from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from api.models import Hospital, Population
from api.serializers import HospitalSerializer, PopulationSerializer

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

def population_data(request):
    population = Population.objects.all()
    serializer = PopulationSerializer(population, many=True)
    return JsonResponse(serializer.data, safe=False)

def population_detail(request, pk):
    try:
        population = Population.objects.get(pk=pk)
    except Population.DoesNotExist:
        raise Http404("Population not found")
    serializer = PopulationSerializer(population)
    return JsonResponse(serializer.data)


def populationdetailed_data(request):
    populationdetailed = PopulationDetailed.objects.all()
    serializer = PopulationDetailedSerializer(populationdetailed, many=True)
    return JsonResponse(serializer.data, safe=False)

def population_detail(request, pk):
    try:
        populationdetailed = PopulationDetailed.objects.get(pk=pk)
    except PopulationDetailed.DoesNotExist:
        raise Http404("Populationdetailed not found")
    serializer = PopulationDetailedSerializer(populationdetailed)
    return JsonResponse(serializer.data)
