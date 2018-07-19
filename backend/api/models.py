from django.db import models
import datetime
from django.utils import timezone

class Hospital(models.Model):
    name = models.CharField(max_length = 500)
    latitude = models.CharField(max_length = 500)
    longitude = models.CharField(max_length = 500)
    nbBeds = models.IntegerField()

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
    code = models.CharField(max_length = 5)
