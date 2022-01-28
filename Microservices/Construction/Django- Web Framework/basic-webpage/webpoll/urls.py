from django.conf.urls import url
from . import views

urlpatterns=[
    # URL pattern to home page
    url('', views.home, name="home"),
    ]