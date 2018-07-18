from django.conf.urls import include, url

from api import views

urlpatterns = [
    url('population/(?P<pk>[0-9]+)/$', views.population_detail),
    url('population', views.population_data),
    url('hospitals/(?P<pk>[0-9]+)/$', views.hospital_detail),
    url('hospitals', views.hospital_list),
]
