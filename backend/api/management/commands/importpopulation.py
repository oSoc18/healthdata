import requests
import numpy as np
import pandas as pd
import bonobo
import os
import csv

from bonobo.contrib.django import ETLCommand
from api.models import Population
from django.conf import settings


def ask_for_data(inform):
    response = requests.get("http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/demo_r_d2jan?", params = inform)
    data = response.json()
    return data["value"].get("0", "")

def convert_province_to_code(name):
    if name == "Bruxelles":
        return "BE1"
    elif name == "Antwerpen":
        return "BE21"
    elif name == "Limburg":
        return "BE22"
    elif name == "Oost_Vlaanderen":
        return "BE23"
    elif name == "Vlaams_Brabant":
        return "BE24"
    elif name == "West_Vlaanderen":
        return "BE25"
    elif name == "Brabant_Wallon":
        return "BE31"
    elif name == "Hainaut":
        return "BE32"
    elif name == "Liege":
        return "BE33"
    elif name == "Luxembourg":
        return "BE34"
    elif name == "Namur":
        return "BE35"

def get_data_by_province(province_name):
    geo = convert_province_to_code(province_name)
    data = []
    for x in range(2010,2018):
        parameters = {"geo": geo, "sex": "T", "precision":1, "unit": "NR", "age":"TOTAL", "time":x}
        data.append(ask_for_data(parameters))
    name = np.repeat(province_name, 8)
    year = np.array([2010,2011,2012,2013,2014,2015,2016,2017])
    amount = np.array(data)
    c = np.column_stack([name,year, amount])
    if not os.path.exists(os.path.join(settings.BASE_DIR, 'api', 'source-data', 'population')):
        os.makedirs(os.path.join(settings.BASE_DIR, 'api', 'source-data', 'population'))
    np.savetxt(os.path.join(settings.BASE_DIR, 'api', 'source-data', 'population', province_name +'.csv'), c, delimiter=',', header="name, year, amount", comments="", fmt='%s')
    return c



def parse_population_data():
    #name = ["Bruxelles", "Antwerpen", "Limburg", "Oost_Vlaanderen", "Vlaams_Brabant", "West_Vlaanderen", "Brabant_Wallon", "Hainaut", "Liege", "Luxembourg", "Namur"]
    #for x in name:
    #    csvFile = open(os.path.join(settings.BASE_DIR, 'api', 'source-data', '{name}.csv'))
    #    reader = csv.DictReader(csvFile)
    #    for row in reader:
    #        yield row
    a = np.concatenate((
            get_data_by_province("Bruxelles"),
            get_data_by_province("Antwerpen"),
            get_data_by_province("Limburg"),
            get_data_by_province("Oost_Vlaanderen"),
            get_data_by_province("Vlaams_Brabant"),
            get_data_by_province("West_Vlaanderen"),
            get_data_by_province("Brabant_Wallon"),
            get_data_by_province("Hainaut"),
            get_data_by_province("Liege"),
            get_data_by_province("Luxembourg"),
            get_data_by_province("Namur")
    ))
    np.savetxt(os.path.join(settings.BASE_DIR, 'api', 'source-data', 'population', 'all_province.csv'), a, delimiter=',', header="name, year, amount", comments="", fmt='%s')
    csvFile = open(os.path.join(settings.BASE_DIR, 'api', 'source-data', 'population', 'all_province.csv'))
    reader = csv.DictReader(csvFile)
    for row in reader:
        yield row

def transform_population_data(row):
    p = Population(name=row['name'], year=row[' year'], amount=row[' amount'])
    yield p

def load_population_data(population):
    population.save()

class Command(ETLCommand):
    def get_graph(self, **options):
        graph = bonobo.Graph()
        graph.add_chain(
            parse_population_data,
            transform_population_data,
            load_population_data
        )
        return graph
