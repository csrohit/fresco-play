from django.test import TestCase
import datetime
from django.utils import timezone
from django.urls import reverse

from .models import question

def create_question(questionname,days):
    # write question creation definition here
    pass


class QuestionHomeViewTests(TestCase):
    def test_no_questions(self):
        """ If no questions exist, an appropriate message is displayed."""
        #Write implementation code here
        pass

        
    def test_past_question(self):
        """ Questions with a pubdate in the past are displayed on the home page."""
        #Write implementation code here
        pass
        
    def test_future_question(self):
        """ Questions with a pub_date in the future aren't displayed on the index page."""
        #Write implementation code here
        pass
        
    def test_past_future_question(self):
        #Write implementation code here
        pass
        
    def test_two_questions(self):
      pass
      #Write implementation code here

class QuestionDetailViewTests(TestCase):
    def test_future_question(self):
        """ The detail view of a question with a pubdate in the future returns a 404 not found. """
        #Write implementation code hereff
        pass
        
    def test_past_question(self):
        """ The detail view of a question with a pubdate in the past displays the question's text. """
        #Write implementation code here
        pass