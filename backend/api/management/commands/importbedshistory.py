import bonobo
import os
import csv
import xlrd
import re

from bonobo.contrib.django import ETLCommand
from api.models import Bed, Hospital, HospitalNetwork, Department
from django.conf import settings

def isInt(value):
    try:
        int(value)
        return True
    except:
        return False
old_to_new_erk_map = {
    2: 117,
    713: 9,
    27: 10,
    53: 110,
    159: 243,
    8: 410
}

def create_departments():
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
'Total Results'
]
    types =  ['A','A1','A2','C','CD','D','E','G','I1','K','K1','K2','L','M','NIC','S1','S2','S3','S4','S5','S6','T','T1','T2','TFB','TFP','TG', 'Total']
    map = dict(zip(types,names))
    for code, name in map.items():
        try:
            department = Department.objects.get(code=code)
        except:
            department = Department(name=name, code=code)
            department.save()
        map[code] = department

def find_old_excels():
    return find_excels(r'Ziekenhuisbedden%20\d{2}_(\d{2})_(\d{4}).*.xlsx')

def find_new_excels():
    return find_excels(r'Adressenlijst%20(\d{2})_(\d{4}).*.xls') 


def find_excels(pattern):
    dataDir = os.path.join(settings.BASE_DIR, 'api', 'source-data', 'hospitals')
    # Ziekenhuisbedden%2001_02_2011
    for root, dirs, files in os.walk(dataDir):
        for name in files:
            match = re.match(pattern, name)
            if match is not None and int(match.group(2)) > 2008:
                yield (name, match.group(1), match.group(2))

column_to_department_code_map = {
        'A':'A',
        'A1':'A1',
        'A2':'A2',
        'C':'C',
        'CD':'CD',
        'D':'D',
        'E':'E',
        'G':'G',
        'I1':'I1',
        'IB "SGA 18+"':'I1',
        'K':'K',
        'K1':'K1',
        'K2':'K2',
        'L':'L',
        'M':'M',
        'NIC':'NIC',
        'S1':'S1',
        'S2':'S2',
        'S3':'S3',
        'S4':'S4',
        'S5':'S5',
        'S6':'S6',
        'T':'T',
        'T1':'T1',
        'T2':'T2',
        'TFB':'TFB',
        'TFP':'TFP',
        'TG':'TG',
        'Tg':'TG',
        'Total Result':'Total',
        'Eindtotaal':'Total',
        'TOTAAL BEDDEN':'Total',
    }

def transform_old_excels_to_beds_history(excel, month, year):
    for x in transform_excels_to_beds_history(excel, 3, 4, 'Erkenningsnummer Ziekenhuis', month, year): yield x

def transform_new_excels_to_beds_history(excel, month, year):
    for x in transform_excels_to_beds_history(excel, 0, 4, 'ERK', month, year, ): yield x

def get_network(id, with_map=False):
    try:
        return HospitalNetwork.objects.get(pk=id)
    except:
        if not with_map and old_to_new_erk_map.get(id) is not None:
            return get_network(old_to_new_erk_map.get(id), True)
        else:
           return None

def transform_excels_to_beds_history(excel, header_row, first_data_row, erk_column, month, year):
    filename = os.path.join(settings.BASE_DIR, 'api', 'source-data', 'hospitals', excel)
    wb = xlrd.open_workbook(filename, 'wb')
    sh = wb.sheet_by_index(0)
    headers = sh.row_values(header_row)
    print('parsing excel %s' % excel)
    for row_number in range(first_data_row, sh.nrows):
        row = dict(zip(headers,sh.row_values(row_number)))
        if isInt(row[erk_column]):
            id = int(row[erk_column])
            network = get_network(id)
            if network is not None:
                for column_name, code in column_to_department_code_map.items():
                    if row.get(column_name) is not None:
                        value = int(row[column_name]) if isInt(row[column_name]) else -1
                        if (value > -1):
                            department=Department.objects.get(code=code)
                            yield Bed(
                                network=network,
                                department=department,
                                year=year,
                                month=month,
                                amount=value
                            )

def save_beds(bed):
    bed.save()

class Command(ETLCommand):
    def get_graph(self, **options):
        graph = bonobo.Graph()
        graph.add_chain(
            create_departments
        )
        graph.add_chain(
            find_old_excels,
            transform_old_excels_to_beds_history,
            save_beds
        )
        graph.add_chain(
            find_new_excels,
            transform_new_excels_to_beds_history,
            save_beds
        )
        return graph
