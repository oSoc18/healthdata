from django.conf.urls import include, url

from api import views

urlpatterns = [
	url('cancer/(?P<pk>[0-9]+)/$', views.cancer_detail),
    url('cancer', views.cancer_data),
	url('hospitals/(?P<pk>[0-9]+)/$', views.hospital_detail),
    url('hospitals/', views.hospital_list),
	url('population/(?P<pk>[0-9]+)/$', views.population_detail),
	url('population/', views.population_data),
	url('populationdetailed/(?P<pk>[0-9]+)/$', views.populationDetailed_detail),
	url('populationdetailed/', views.populationDetailed_data),
	url('depression/(?P<pk>[0-9]+)/$', views.depression_detail),
    url('depression', views.depression_data),
]
