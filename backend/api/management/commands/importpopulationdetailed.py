import requests
import bonobo
import os
import csv

from bonobo.contrib.django import ETLCommand
from api.models import PopulationDetailed
from django.conf import settings


def ask_for_data(inform):
    response = requests.get("http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/demo_r_d2jan?", params = inform)
    data = response.json()
    inform['amount'] = data["value"].get("0", "")
    yield inform

def convert_age_to_code(age):
    return ("Y" + str(age))

# for one year most recent only
def get_feature_data_by_province(geo, sex, age):
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


def build_params():
    codes = ['BE1','BE21','BE22','BE23','BE24','BE25','BE31','BE32','BE33','BE34','BE35']
    names = ['Bruxelles', 'Antwerpen', 'Limburg', 'Oost_Vlaanderen', 'Vlaams_Brabant', 'West_Vlaanderen', 'Brabant_Wallon', 'Hainaut', 'Liege', 'Luxembourg', 'Namur']
    codes_to_names=dict(zip(codes,names))
    for age in range(1,97):
        for code in codes:
            for gender in ['M','F']:
                yield {'geo': code, 'sex': gender, 'precision': 1, 'unit': 'NR', 'age': 'Y'+str(age), 'rawAge': age, 'time': 2017, 'name': codes_to_names[code]}

def transform_feature_population_data(row):
    p = PopulationDetailed(name=row['name'], code=row['geo'], year=row['time'], amount=row['amount'], age=row['rawAge'], gender=row['sex'])
    yield p

def load_feature_population_data(population):
    population.save()

class Command(ETLCommand):
    def get_graph(self, **options):
        graph = bonobo.Graph()
        graph.add_chain(
            build_params,
            ask_for_data,
            transform_feature_population_data,
            load_feature_population_data
        )
        return graph

