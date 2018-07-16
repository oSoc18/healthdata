from django.conf.urls import include, url

from api import views


urlpatterns = [
    url('importHospitals', views.importHospitals),
]
