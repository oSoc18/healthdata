from rest_framework import serializers
from api.models import Hospital
from api.models import Bed

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ('id', 'siteNbr', 'name', 'latitude', 'longitude', 'nbBeds', 'address', 'postalCode', 'town', 'telephone', 'website', 'province', 'type')

class BedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bed
        fields = ('id', 'year', 'month', 'type', 'amount')
