from django.db import models

# Create your models here.
class Hospitals(models.Model):
    name = models.CharField(max_length = 500)
    latitude = models.CharField(max_length = 250)
    longitude = models.CharField(max_length = 250)
    nbBeds = models.IntegerField()
