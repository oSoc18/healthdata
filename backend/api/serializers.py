from rest_framework import serializers
from api.models import Hospital
from api.models import Population, PopulationDetailed

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ('id', 'name', 'latitude', 'longitude', 'nbBeds')

class PopulationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Population
        fields = ('id', 'name', 'year', 'amount')

class PopulationDetailedSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopulationDetailed
        fields = ('id', 'name', 'year', 'amount', 'age', 'gender', 'code')
