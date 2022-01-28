from django.conf.urls import url,include
from . import views

app_name='webpoll'
urlpatterns=[
    url(r'^$', views.HomeView.as_view(), name='home'),
    url(r'^(?P<pk>[0-9]+)/$',views.QuestionDetailView.as_view(),name='detail'),
    url(r'<int:pk>/results/', views.ResultsView.as_view(), name='results'),
    url('<int:pk>/vote/', views.vote, name='vote'),
    ]


