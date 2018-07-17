import bonobo
import os
import csv
from geopy.geocoders import Nominatim
from bonobo.contrib.django import ETLCommand
from api.models import Hospital
from django.conf import settings
from api.models import Hospital

def isInt(value):
    try:
        int(eval(value))
        return True
    except:
        return False

def parse_hospital_data():
    csvFile = open(os.path.join(settings.BASE_DIR, 'api', 'source-data', 'hospitalsDetailed.csv'))
    reader = csv.DictReader(csvFile)
    for row in reader:
        yield row

def transform_hospital_data(row):
    geolocator = Nominatim()
    location = geolocator.geocode(row["ADRES"] + " " + row["POST"] + " " + row["GEMEENTE "])
    if not location:
        lat = ""
        long = ""
    else:
        lat = location.latitude
        long = location.longitude
    if not isInt(row['TOTAAL BEDDEN']):
        beds = 0
    else:
        beds = int(eval(row["TOTAAL BEDDEN"]))
    try:
        p = Hospital(name=row['ZIEKENHUIS '], latitude=lat, longitude=long, nbBeds=beds,
            siteNbr=int(eval(row["VESTIGINGSNR"])), address=row["ADRES"], postalCode=int(eval(row["POST"])),
            town=row["GEMEENTE "], website=row["WEBSITE"], telephone=row["TELEFOON"], province=row["PROVINCIE "], type=row["SOORT ZIEKENHUIS"])
        yield p
    except:
        pass

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
