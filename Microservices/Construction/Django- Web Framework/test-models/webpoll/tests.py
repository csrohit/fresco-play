from django.test import TestCase
import datetime
from django.utils import timezone

from .models import question

class QuestionModelTests(TestCase):
    def test_question_is_future(self):
        ''' is_recent should be false for questions published with future date'''
        #write implementation here
        
    def test_question_is_old(self):
        ''' is_recent should be false for questions published with older date'''
        #write implementation here
        
    def test_question_is_current(self):
        ''' is_recent should be true for questions published within 1 day'''
        #write implementation here


        
