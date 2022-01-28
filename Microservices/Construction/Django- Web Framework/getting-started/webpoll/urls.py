#from django.urls import path
from django.conf.urls import url,include
from . import views

app_name='webpoll'
urlpatterns=[
     url(r'^$', views.HomeView.as_view(), name='home'),
     url(r'^(?P<pk>[0-9]+)/$',views.QuestionDetailView.as_view(),name='detail'),
    ]