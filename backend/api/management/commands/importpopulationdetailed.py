import requests
import numpy as np
import pandas as pd
import bonobo
import os
import csv

from bonobo.contrib.django import ETLCommand
from api.models import PopulationDetailed
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

def convert_age_to_code(age):
    return ("Y" + str(age))

# for one year most recent only
def get_feature_data_by_province(province_name, sex, age):
    geo = convert_province_to_code(province_name)
    age_input = convert_age_to_code(age)
    data = []
    parameters = {"geo": geo, "sex": sex, "precision":1, "unit": "NR", "age":age_input, "time":2017}
    data.append(ask_for_data(parameters))
    name = np.repeat(province_name, 1)
    year = np.array([2017])
    amount = np.array(data)
    age = np.array([age])
    gender = np.array([sex])
    c = np.column_stack([name,year,amount, age, gender])
    #np.savetxt(os.path.join(settings.BASE_DIR, 'api', 'source-data', province_name + sex + age + '.csv'), c, delimiter=',', header="name, year, amount", comments="", fmt='%s')
    return c

# solve exec doesn't work in a function problem
my_data = ["Bruxelles", "Antwerpen", "Limburg", "Oost_Vlaanderen", "Vlaams_Brabant", "West_Vlaanderen", "Brabant_Wallon", "Hainaut", "Liege", "Luxembourg", "Namur"]
# for female
for age in range(1,100):
    print("female", age)
    for i in range(len(my_data)):
        exec(f'{my_data[i]}_{age}_f_2017 = get_feature_data_by_province(province_name = my_data[i], sex="F", age = age)')
# for male
for age in range(1,100):
    print("male", age)
    for i in range(len(my_data)):
        exec(f'{my_data[i]}_{age}_m_2017 = get_feature_data_by_province(province_name = my_data[i], sex="M", age = age)')
# for total
for age in range(1,100):
    print("all", age)
    for i in range(len(my_data)):
        exec(f'{my_data[i]}_{age}_t_2017 = get_feature_data_by_province(province_name = my_data[i], sex="T", age = age)')

c = np.empty(shape=(0,5))
for age in range(1,100):
    for i in range(len(my_data)):
        exec(f'a = np.concatenate(({my_data[i]}_{age}_f_2017, {my_data[i]}_{age}_m_2017, {my_data[i]}_{age}_t_2017))')
        exec(f'c = np.concatenate((c,a))')
np.savetxt(os.path.join(settings.BASE_DIR, 'api', 'source-data', 'feature_population.csv'), c, delimiter=',', header="name, year, amount, age, gender", comments="", fmt='%s')
    

def parse_feature_population_data():
    csvFile = open(os.path.join(settings.BASE_DIR, 'api', 'source-data', 'feature_population.csv'))
    reader = csv.DictReader(csvFile)
    for row in reader:
        yield row
    
def transform_feature_population_data(row):
    p = PopulationDetailed(name=row['name'], year=row[' year'], amount=row[' amount'], age=row[' age'], gender=row[' gender'])
    yield p

def load_feature_population_data(population):
    population.save()

class Command(ETLCommand):
    def get_graph(self, **options):
        graph = bonobo.Graph()
        graph.add_chain(
            parse_feature_population_data,
            transform_feature_population_data,
            load_feature_population_data
        )
        return graph
