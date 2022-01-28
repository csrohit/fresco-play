from django.views import generic
from django.utils import timezone
from django.shortcuts import get_object_or_404,render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse

from .models import question,choice

# Create your views here.
class HomeView(generic.ListView):
    template_name='webpoll/home.html'
    context_object_name='recent_question_list'
    def get_queryset(self):
        # return the recent 6 published questions
        return question.objects.filter(pubdate__lte=timezone.now()).order_by('-pubdate')[:6]

class QuestionDetailView(generic.DetailView):
    model=question
    template_name='webpoll/question_detail.html'
    def get_queryset(self):
        return question.objects.filter(pubdate__lte=timezone.now())

def vote(request, question_id):
    quest=get_object_or_404(question,pk=question_id)
    try:
        selected_choice = quest.choice_set.get(pk=request.POST['choice'])
    
    except (KeyError, choice.DoesNotExist):
        return render(request, 'webpoll/question_detail.html', {
            'question':quest,
            'error_message':"You didn't select a choice",
            })
    else:
        selected_choice.vote+=1
        selected_choice.save()
        return HttpResponseRedirect(reverse('webpoll:result',args=(question_id,)))
    
class VoteResultView(generic.DetailView):
    model=question
    template_name='webpoll/vote_result.html'