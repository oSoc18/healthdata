from django.conf.urls import url
from . import views

urlpatterns=[
    url('importHospitals', views.importHospitals),
]
