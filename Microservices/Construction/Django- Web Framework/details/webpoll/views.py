from django.views import generic
from django.utils import timezone
from django.shortcuts import get_object_or_404,render
from django.http import HttpResponse

from .models import question,choice

class HomeView(generic.ListView):
    template_name='webpoll/home.html'
    context_object_name='recent_question_list'
    def get_queryset(self):
        return question.objects.filter(pubdate__lte=timezone.now()).order_by('-pubdate')[:6]

class QuestionDetailView(generic.DetailView):
    model=question
    template_name='webpoll/question_detail.html'
    def get_queryset(self):
        return question.objects.filter(pubdate__lte=timezone.now())



