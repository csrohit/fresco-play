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

def vote(request, question_id):
    qus = get_object_or_404(question, pk=question_id)
    try:
        selected_choice = qus.choice_set.get(pk=request.POST['choice'])
    except(KeyError, choice.DoesNotExist):
        return render(request, 'webpoll/question_detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('webpoll:results', args=(question.id,)))
class ResultsView(generic.DetailView):
    model = question
    template_name = 'webpoll/results.html'