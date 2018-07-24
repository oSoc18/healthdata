from django.db import models
import datetime
from django.utils import timezone

class Department(models.Model):
    name = models.CharField(max_length = 600)
    code = models.CharField(max_length = 5, unique=True)

class HospitalNetwork(models.Model):
    name = models.CharField(max_length = 500)
    id = models.IntegerField(primary_key = True)

class Hospital(models.Model):
    network = models.ForeignKey(HospitalNetwork, to_field="id", db_column="hospital_network_id", on_delete=models.CASCADE)
    name = models.CharField(max_length = 500)
    latitude = models.CharField(max_length = 500)
    longitude = models.CharField(max_length = 500)
    nbBeds = models.IntegerField()
    siteNbr = models.CharField(max_length=10, unique=True, null=True)
    address = models.CharField(max_length = 500, null=True)
    postalCode = models.IntegerField(null=True)
    town = models.CharField(max_length = 500, null=True)
    website = models.CharField(max_length = 500, null=True)
    telephone = models.CharField(max_length = 500, null=True)
    province = models.CharField(max_length = 500, null=True)
    type = models.CharField(max_length = 500, null=True)

    def __str__(self):
        template = '{0.name} {0.latitude} {0.longitude} {0.nbBeds}'
        return template.format(self)

class Population(models.Model):
    name = models.CharField(max_length = 600)
    year = models.IntegerField()
    amount = models.IntegerField()

class PopulationDetailed(models.Model):
    name = models.CharField(max_length = 600)
    year = models.IntegerField()
    amount = models.IntegerField()
    age = models.IntegerField(null=True)
    gender = models.CharField(max_length = 600, null = True)
    code = models.CharField(max_length = 5, null=True)

class Cancer(models.Model):
    agegroup = models.CharField(max_length = 600)
    gender = models.CharField(max_length = 600)
    region = models.CharField(max_length = 600)
    cancer = models.CharField(max_length = 600)
    value = models.CharField(max_length = 600)

class Depression(models.Model):
    gender = models.CharField(max_length = 500)
    agegroup = models.CharField(max_length = 500)
    crude = models.DecimalField(decimal_places=5, max_digits=10)
    province = models.CharField(max_length = 500)
    year = models.IntegerField(null=True)

class Bed(models.Model):
    network = models.ForeignKey(HospitalNetwork, to_field="id", db_column="network_id", on_delete=models.CASCADE)
    year = models.IntegerField()
    month = models.IntegerField()
    amount = models.IntegerField()
    department = models.ForeignKey(Department, to_field="code", db_column="department_id", on_delete=models.CASCADE)
