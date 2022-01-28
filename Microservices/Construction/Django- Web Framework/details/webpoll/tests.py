from django.test import TestCase
import datetime
from django.utils import timezone
from django.urls import reverse

from .models import question

# Create your tests here.
class QuestionModelTests(TestCase):
    def test_question_is_future(self):
        ''' is_recent should be false for questions published with future date'''
        time=timezone.now() + datetime.timedelta(days=20)
        future_question=question(pubdate=time)
        self.assertIs(future_question.is_recent(), False)
        
    def test_question_is_old(self):
        ''' is_recent should be false for questions published with older date'''
        time = timezone.now() - datetime.timedelta(days=1,seconds=1)
        old_question = question(pubdate=time)
        self.assertIs(old_question.is_recent(),False)
        
    def test_question_is_current(self):
        ''' is_recent should be true for questions published within 1 day'''
        time = timezone.now() - datetime.timedelta(hours=23, minutes=59, seconds=59)
        recent_question = question(pubdate=time)
        self.assertIs(recent_question.is_recent(),True)

def create_question(questionname,days):
    """
    Create a question with the given `question_text` and published the
    given number of `days` offset to now (negative for questions published
    in the past, positive for questions that have yet to be published).
    """
    time=timezone.now() + datetime.timedelta(days=days)
    return question.objects.create(questionname=questionname,pubdate=time)

class QuestionIndexViewTests(TestCase):
    def test_no_questions(self):
        """
        If no questions exist, an appropriate message is displayed.
        """
        response=self.client.get(reverse('webpoll:home'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Questions not available for polling!")
        self.assertQuerysetEqual(response.context['recent_question_list'], [])
        
    def test_past_question(self):
        """
        Questions with a pub_date in the past are displayed on the
        index page.
        """
        create_question(questionname="Past question.",days=-30)
        response=self.client.get(reverse('webpoll:home'))
        self.assertQuerysetEqual(response.context['recent_question_list'], ['<question: Past question.>'])
        
    def test_future_question(self):
        """
        Questions with a pub_date in the future aren't displayed on
        the index page.
        """
        create_question(questionname="Future question.", days=30)
        response=self.client.get(reverse('webpoll:home'))
        self.assertContains(response, "Questions not available for polling!")
        self.assertQuerysetEqual(response.context['recent_question_list'], [])
        
    def test_past_future_question(self):
        create_question(questionname="Past question.", days=-30)
        create_question(questionname="Future question.", days=30)
        response=self.client.get(reverse('webpoll:home'))
        self.assertQuerysetEqual(response.context['recent_question_list'], ['<question: Past question.>'])
        
    def test_two_questions(self):
        create_question(questionname="Past question 1.", days=-30)
        create_question(questionname="Past question 2.", days=-10)
        response=self.client.get(reverse('webpoll:home'))
        self.assertQuerysetEqual(response.context['recent_question_list'], ['<question: Past question 2.>', '<question: Past question 1.>'])

class QuestionDetailViewTests(TestCase):
    def test_future_question(self):
        """
        The detail view of a question with a pub_date in the future
        returns a 404 not found.
        """
        future_question = create_question(questionname='Future question.', days=5)
        url = reverse('webpoll:detail',args=(future_question.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)
        
    def test_past_question(self):
        """
        The detail view of a question with a pub_date in the past
        displays the question's text.
        """
        past_question=create_question(questionname="Past Question", days=-5)
        url = reverse('webpoll:detail',args=(past_question.id,))
        response = self.client.get(url)
        self.assertContains(response, past_question.questionname)
        