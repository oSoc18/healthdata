from rest_framework import serializers
from api.models import Hospital

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ('id', 'name', 'latitude', 'longitude', 'nbBeds')
