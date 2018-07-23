import bonobo
import os
import csv
import xlrd
import re

from bonobo.contrib.django import ETLCommand
from api.models import Bed, Hospital, HospitalNetwork
from django.conf import settings

def isInt(value):
    try:
        int(value)
        return True
    except:
        return False

def find_excels():
    dataDir = os.path.join(settings.BASE_DIR, 'api', 'source-data', 'hospitals')
    # Ziekenhuisbedden%2001_02_2011
    for root, dirs, files in os.walk(dataDir):
        for name in files:
            match = re.match(r'Ziekenhuisbedden%20\d{2}_(\d{2})_(\d{4}).*.xlsx', name)
            if match is not None and int(match.group(2)) > 2008:
                yield (name, match.group(1), match.group(2))

def bed_type_for_name(type):
    names = [
'Neuropsychiatric department for observation and treatment',
'Day nursing in an A department',
'Night nursing in an A department',
'Department for surgical diagnosis and treatment',
'Mixed inpatient department C + D',
'Department for medical diagnosis and treatment',
'Paediatric medicine department',
'Exclusive Medicine for Older People department',
'Department for intensive treatment of psychiatric patients “Adult SGA (severely disturbed and aggressive)”',
'Neuropsychiatric department for children',
'Day nursing in K department',
'Night nursing in K department',
'Infectious diseases department',
'Maternity',
'Neonatal intensive care department',
'Specialist department for cardio-pulmonary conditions',
'Specialist department for locomotor conditions',
'Specialist department for neurological conditions',
'Specialist department for palliative care',
'Specialist department for chronic diseases',
'Specialist Older Persons Mental Health department',
'Neuropsychiatric department for treatment',
'Day nursing in T department',
'Night nursing in T department',
'Inpatient placement with family',
'Placement in family context',
'Day and night nursing for older patients requiring neuropsychiatric treatment',
'Total Result',
'Total Result'
]
    types =  ['A','A1','A2','C','CD','D','E','G','I1','K','K1','K2','L','M','NIC','S1','S2','S3','S4','S5','S6','T','T1','T2','TFB','TFP','TG', 'Total Result','Eindtotaal']
    map = dict(zip(types,names))
    return map[type]

def transform_excels_to_beds_history(excel, month, year):
    filename = os.path.join(settings.BASE_DIR, 'api', 'source-data', 'hospitals', excel)
    wb = xlrd.open_workbook(filename, 'wb')
    sh = wb.sheet_by_index(0)
    headers = sh.row_values(3)
    print('parsing excel %s' % excel)
    for row_number in range(4,sh.nrows):
        row = dict(zip(headers,sh.row_values(row_number)))
        try:
            network = HospitalNetwork.objects.get(pk=int(row['Erkenningsnummer Ziekenhuis']))
        except:
            network = None
        if network is not None:
            for type in ['A','A1','A2','C','CD','D','E','G','I1','K','K1','K2','L','M','NIC','S1','S2','S3','S4','S5','S6','T','T1','T2','TFB','TFP','TG', 'Total Result','Eindtotaal']:
                if row.get(type) is not None:
                    value = int(row[type]) if isInt(row[type]) else -1
                    if (value > -1):
                        yield Bed(
                            network=network,
                            year=year,
                            month=month,
                            amount=value,
                            type=type,
                            typeName=bed_type_for_name(type)
                        )
        else:
            print('network not found for ERK: %s, excel: %s' % (row['Erkenningsnummer Ziekenhuis'], excel))

def save_beds(bed):
    bed.save()

class Command(ETLCommand):
    def get_graph(self, **options):
        graph = bonobo.Graph()
        graph.add_chain(
            find_excels,
            transform_excels_to_beds_history,
            save_beds
        )
        return graph
