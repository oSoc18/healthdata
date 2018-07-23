from rest_framework import serializers
from api.models import Hospital, HospitalNetwork
from api.models import Bed, Depression, Cancer
from api.models import Population, PopulationDetailed

class PopulationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Population
        fields = ('id', 'name', 'year', 'amount')

class PopulationDetailedSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopulationDetailed
        fields = ('id', 'name', 'year', 'amount', 'age', 'gender')
class CancerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cancer
        fields = ('id', 'agegroup', 'gender', 'region', 'cancer', 'value')

class DepressionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Depression
        fields = ('id', 'gender', 'agegroup', 'crude', 'province', 'year')

class BedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bed
        fields = ('id', 'year', 'month', 'type', 'amount','typeName')

class HospitalNetworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = HospitalNetwork
        fields = ('id', 'name')

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ('id', 'siteNbr', 'name', 'latitude', 'longitude', 'nbBeds', 'address', 'postalCode', 'town', 'telephone', 'website', 'province', 'type','network')

