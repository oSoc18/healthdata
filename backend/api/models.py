from django.db import models
import datetime
from django.utils import timezone

class Hospital(models.Model):
    name = models.CharField(max_length = 500)
    latitude = models.CharField(max_length = 500)
    longitude = models.CharField(max_length = 500)
    nbBeds = models.IntegerField()
    siteNbr = models.IntegerField(unique=True, null=True)
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

class Bed(models.Model):
    hospital_siteNbr = models.ForeignKey(Hospital, to_field="siteNbr", db_column="hospital_siteNbr", on_delete=models.CASCADE)
    year = models.IntegerField()
    month = models.IntegerField()
    type = models.IntegerField()
    amount = models.IntegerField()

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
