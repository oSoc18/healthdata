from django.conf.urls import include, url

from api import views


urlpatterns = [
    url('importHospitals', views.importHospitals),
    url('hospitals/(?P<pk>[0-9]+)/$', views.hospital_detail),
    url('hospitals', views.hospital_list),
]
