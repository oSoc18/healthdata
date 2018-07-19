import bonobo
import os
import csv

from bonobo.contrib.django import ETLCommand
from api.models import Hospital
from django.conf import settings
from api.models import Hospital

def isInt(value):
    try:
        int(value)
        return True
    except:
        return False

def parse_hospital_data():
    csvFile = open(os.path.join(settings.BASE_DIR, 'api', 'source-data', 'hospitals.csv'))
    reader = csv.DictReader(csvFile)
    for row in reader:
        yield row

def transform_hospital_data(row):
    if not isInt(row['beds']):
        #if number of beds not provided
        p = Hospital(name=row['name'], latitude=row['lat'], longitude=row['long'], nbBeds=0)
    else:
        p = Hospital(name=row['name'], latitude=row['lat'], longitude=row['long'], nbBeds=int(row['beds']))
    yield p

def load_hospital_data(hospital):
    hospital.save()
# https://fair-acc.healthdata.be/api/3/action/group_package_show?id=469baf11-ddd1-4c30-9ad3-a21a7d0f7397
class Command(ETLCommand):
    def get_graph(self, **options):
        graph = bonobo.Graph()
        graph.add_chain(
            parse_hospital_data,
            transform_hospital_data,
            load_hospital_data
        )
        return graph
