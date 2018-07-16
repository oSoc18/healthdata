# Register your models here.
from django.contrib import admin
from api.models import Hospital

class HospitalAdmin(admin.ModelAdmin):
    fieldsets = [
        ('name', {'fields': ['name'], 'classes': ['collapse']}),
        ('beds', {'fields': ['nbBeds'], 'classes': ['collapse']}),
        ('lat information', {'fields': ['latitude'], 'classes': ['collapse']}),
        ('long information', {'fields': ['longitude'], 'classes': ['collapse']})
    ]

admin.site.register(Hospital, HospitalAdmin)
