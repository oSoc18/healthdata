from rest_framework import serializers
<<<<<<< HEAD
from api.models import Hospital, Population, PopulationDetailed, Depression
=======
from api.models import Hospital
from api.models import Bed
from api.models import Population, PopulationDetailed
>>>>>>> develop

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ('id', 'siteNbr', 'name', 'latitude', 'longitude', 'nbBeds', 'address', 'postalCode', 'town', 'telephone', 'website', 'province', 'type')

class BedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bed
        fields = ('id', 'year', 'month', 'type', 'amount')

class PopulationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Population
        fields = ('id', 'name', 'year', 'amount')

class PopulationDetailedSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopulationDetailed
        fields = ('id', 'name', 'year', 'amount', 'age', 'gender')

class DepressionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Depression
        fields = ('id', 'gender', 'agegroup', 'crude', 'province', 'year')
