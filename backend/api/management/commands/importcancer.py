import bonobo
import os
import csv

from bonobo.contrib.django import ETLCommand
from django.conf import settings
from api.models import Cancer

def isInt(value):
    try:
        int(value)
        return True
    except:
        return False

def parse_cancer_data():
    csvFile = open(os.path.join(settings.BASE_DIR, 'api', 'source-data', 'cancer.csv'))
    reader = csv.DictReader(csvFile)
    for row in reader:
        yield row

def transform_cancer_data(row):
    if not isInt(row['value']):
        #if number of beds not provided
        p = Cancer(agegroup=row['agegroup'], gender=row['gender'], region=row['region'], cancer=row['cancer'], value='not available')
    else:
        p = Cancer(agegroup=row['agegroup'], gender=row['gender'], region=row['region'], cancer=row['cancer'], value=row['value'])
    yield p

def load_cancer_data(hospital):
    hospital.save()
# https://fair-acc.healthdata.be/api/3/action/group_package_show?id=469baf11-ddd1-4c30-9ad3-a21a7d0f7397
class Command(ETLCommand):
    def get_graph(self, **options):
        graph = bonobo.Graph()
        graph.add_chain(
            parse_cancer_data,
            transform_cancer_data,
            load_cancer_data
        )
        return graph
