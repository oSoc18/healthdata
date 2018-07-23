import re
import bonobo
import os
import csv
import xlrd

from geopy.geocoders import Nominatim
import geopy
from bonobo.contrib.django import ETLCommand
from api.models import Hospital, HospitalNetwork
from django.conf import settings
from datetime import date
from api.utils import geocode

geopy.geocoders.options.default_user_agent = 'healthstory-data-import'
geopy.geocoders.options.default_timeout = 30
def isInt(value):
    try:
        int(eval(str(value)))
        return True
    except:
        return False

def parse_hospital_data():
    year = date.today().year
    dataDir = os.path.join(settings.BASE_DIR, 'api', 'source-data', 'hospitals')
    latest_month = 0
    latest_file = ''
    for root, dirs, files in os.walk(dataDir):
        for name in files:
            match = re.match(r'Adressenlijst%20(\d{2})_(\d{4}).*', name)
            if match is not None and int(match.group(2)) == year:
                if latest_month < int(match.group(1)):
                    latest_month =  int(match.group(1))
                    latest_file = name
    filename = os.path.join(settings.BASE_DIR, 'api', 'source-data', 'hospitals', latest_file)
    wb = xlrd.open_workbook(filename, 'wb')
    sh = wb.sheet_by_index(0)
    headers = sh.row_values(0)
    for row_number in range(2,sh.nrows):
        yield dict(zip(headers, sh.row_values(row_number)))

def get_network(id,name):
    try:
        network = HospitalNetwork.objects.get(pk=id)
    except:
        network = HospitalNetwork(name=name,id=id)
        network.save()
    return network

def transform_hospital_data(row):
    geolocator = Nominatim()
    try:
        location = geolocator.geocode(row["ADRES"] + " " + str(row["POST"]) + " " + row["GEMEENTE "] + " " + ", Belgium")
        lat = location.latitude
        long = location.longitude
    except:
        googleResponse = geocode.get_google_results(row["ADRES"] + " " + str(row["POST"]) + " " + row["GEMEENTE "] + " " + ", Belgium", os.environ['GOOGLE_API_KEY'])
        lat = googleResponse["latitude"]
        long = googleResponse["longitude"]
    if not isInt(str(row['TOTAAL BEDDEN'])):
        beds = 0
    else:
        beds = int(eval(str(row["TOTAAL BEDDEN"])))
    try:
        if isInt(row['ERK']):
            network = get_network(int(row['ERK']),row['ZIEKENHUIS '])
            cleaned_name = row['CAMPUS'].strip()
            name = cleaned_name if cleaned_name else row['ZIEKENHUIS '].strip()
            p = Hospital(
                network=network,
                latitude=lat,
                longitude=long,
                nbBeds=beds,
                siteNbr=row["VESTIGINGSNR"],
                address=row["ADRES"],
                postalCode=int(row["POST"]),
                town=row["GEMEENTE "],
                website=row["WEBSITE"],
                telephone=row["TELEFOON"],
                province=row["PROVINCIE "],
                name=name,
                type=row["SOORT ZIEKENHUIS"]
            )
            yield p
    except:
        print('failed for ')
        print(row)
        print(sys.exc_info()[0])
        pass

def load_hospital_data(hospital):
    hospital.save() #todo: find a way to ignore duplicate VESTIGINGSNR

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
