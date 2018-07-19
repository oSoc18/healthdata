import bonobo
import requests
import os
from django.conf import settings
from bonobo.contrib.django import ETLCommand
from django.conf import settings

BASE_URI = 'https://fair-acc.healthdata.be/api/3/action/'
def get_excel_urls():
    datasets =  requests.get(BASE_URI + 'group_package_show?id=469baf11-ddd1-4c30-9ad3-a21a7d0f7397').json()['result'][0] # todo remove hardcoded url
    resource_ids = list()
    for dataset in datasets:
        for resource in dataset.get('resources'):
            yield requests.get(BASE_URI + 'resource_show?id=' + resource.get('id')).json().get('result').get('url')

def download_excels(url):
    r = requests.get(url, stream=True)
    index = url.rfind('/') + 1
    if not os.path.exists(os.path.join(settings.BASE_DIR, 'api', 'source-data', 'hospitals')):
        os.makedirs(os.path.join(settings.BASE_DIR, 'api', 'source-data', 'hospitals'))
    local_filename = os.path.join(settings.BASE_DIR, 'api', 'source-data', 'hospitals', url[index:])
    with open(local_filename , 'wb') as f:
        for chunk in r.iter_content(chunk_size=1024):
            if chunk: # filter out keep-alive new chunks
                f.write(chunk)
    yield local_filename

# https://fair-acc.healthdata.be/api/3/action/group_package_show?id=469baf11-ddd1-4c30-9ad3-a21a7d0f7397
# returns all historical data
class Command(ETLCommand):
    def get_graph(self, **options):
        graph = bonobo.Graph()
        graph.add_chain(get_excel_urls, download_excels)
        return graph
