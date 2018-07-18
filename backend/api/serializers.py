from rest_framework import serializers
from api.models import Hospital
from api.models import Population

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ('id', 'name', 'latitude', 'longitude', 'nbBeds')

class PopulationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Population
        fields = ('id', 'name', 'year', 'amount')