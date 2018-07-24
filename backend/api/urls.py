from django.conf.urls import include, url

from api import views

urlpatterns = [
	url('cancer/(?P<pk>[0-9]+)/$', views.cancer_detail),
    url('cancer', views.cancer_data),
	url('hospitals/(?P<pk>[0-9]+)/$', views.hospital_detail),
    url('hospitals/', views.hospital_list),
	url('population/', views.population_data),
    url('depression', views.depression_data),
    url('hospital-networks/(?P<pk>.*)/beds$', views.beds_per_network),
    url('hospital-networks/', views.hospitalNetwork_list),
    url('departments/', views.department_list),
]
