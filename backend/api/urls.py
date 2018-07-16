from django.conf.urls import url
from . import views

urlpatterns=[
    url('importHospitals', views.importHospitals),
    url('hospitalDetail/(?P<pk>[0-9]+)/', views.hospital_detail),
    url('hospitals', views.hospital_list),
]
