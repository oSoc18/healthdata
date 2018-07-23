import bonobo
import os
import csv

from bonobo.contrib.django import ETLCommand
from api.models import Depression
from django.conf import settings


def parse_depression_data():
    csvFile = open(os.path.join(settings.BASE_DIR, 'api', 'source-data', 'depression_data.csv'))
    reader = csv.DictReader(csvFile)
    for row in reader:
        yield row

def transform_depression_data(row):
    p = Depression(gender=row['gender'], agegroup=row['agegroup'], crude=row['crude'], province=row['province'], year=row['year'])
    yield p

def load_depression_data(hospital):
    hospital.save()
# https://fair-acc.healthdata.be/api/3/action/group_package_show?id=469baf11-ddd1-4c30-9ad3-a21a7d0f7397
class Command(ETLCommand):
    def get_graph(self, **options):
        graph = bonobo.Graph()
        graph.add_chain(
            parse_depression_data,
            transform_depression_data,
            load_depression_data
        )
        return graph
