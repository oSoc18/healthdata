from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from api.models import Bed, Department, Hospital, HospitalNetwork, Population, PopulationDetailed, Depression, Cancer
from api.serializers import HospitalSerializer, DepartmentSerializer,  HospitalNetworkSerializer, PopulationSerializer, PopulationDetailedSerializer
from api.serializers import CancerSerializer, DepressionSerializer, HospitalNetworkSerializer, BedSerializer
from django.db.models import Sum
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

def populationDetailed_data(request):
    population = PopulationDetailed.objects.all()
    serializer = PopulationDetailedSerializer(population, many=True)
    return JsonResponse(serializer.data, safe=False)

def populationDetailed_detail(request, pk):
    try:
        population = PopulationDetailed.objects.get(pk=pk)
    except PopulationDetailed.DoesNotExist:
        raise Http404("Populationdeatiled not found")
    serializer = PopulationDetailedSerializer(population)
    return JsonResponse(serializer.data)

def cancer_data(request):
    population = Cancer.objects.all()
    serializer = CancerSerializer(population, many=True)
    return JsonResponse(serializer.data, safe=False)

def cancer_detail(request, pk):
    try:
        population = Cancer.objects.get(pk=pk)
    except Cancer.DoesNotExist:
        raise Http404("Populationdeatiled not found")
    serializer = CancerSerializer(population)

def depression_data(request):
    data = Depression.objects.all()
    if request.GET.get('year') is not None:
        data = data.filter(year=int(request.GET.get('year')))
    if request.GET.get('agegroup') is not None:
        data = data.filter(agegroup=request.GET.get('agegroup')) # todo probably unsafe
    if request.GET.get('province') is not None:
        data = data.filter(province=request.GET.get('province')) # todo probably unsafe
    if request.GET.get('gender') is not None:
        data = data.filter(gender=request.GET.get('gender'))
    serializer = DepressionSerializer(data, many=True)
    return JsonResponse(serializer.data, safe=False)

def depression_detail(request, pk):
    try:
        population = Depression.objects.get(pk=pk)
    except Depression.DoesNotExist:
        raise Http404("Depression not found")
    serializer = DepressionSerializer(population)
    return JsonResponse(serializer.data)

def hospitalNetwork_list(request):
    networks = HospitalNetwork.objects.all()
    serializer = HospitalNetworkSerializer(networks, many=True)
    return JsonResponse(serializer.data, safe=False)

def beds_per_network(request, pk):
    network = HospitalNetwork.objects.get(pk=pk)
    beds = Bed.objects.filter(network=network)
    if request.GET.get('year') is not None:
        beds = beds.filter(year=int(request.GET.get('year'))) # todo probably unsafe
    if request.GET.get('type') is not None:
        beds = beds.filter(type=request.GET.get('type')) # todo probably unsafe
    serializer = BedSerializer(beds, many=True)
    return JsonResponse(serializer.data, safe=False)

def department_list(request):
    result = []
    for department in Department.objects.all():
        dep = DepartmentSerializer(department).data
        dep['beds'] = []
        for row in Bed.objects.distinct('year','month'):
            r = Bed.objects.filter(department=department).filter(year=row.year).filter(month=row.month).aggregate(total=Sum('amount'))
            dep['beds'].append({"year": row.year, "month": row.month, "total": r['total'] })
        result.append(dep)
    return JsonResponse(result, safe=False)
