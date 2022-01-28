from django.db import models
import datetime
from django.utils import timezone

# Create your models here.
class question(models.Model):
    questionname = models.CharField(max_length=200)
    pubdate = models.DateTimeField("Published Date")

    def __str__(self):
        return self.questionname
    
    def is_recent(self):
        now=timezone.now()
        return now - datetime.timedelta(days=1) <= self.pubdate <= now
    
class choice(models.Model):
    choicename = models.CharField(max_length=200)
    vote = models.IntegerField(default=0)
    quest = models.ForeignKey(question, on_delete = models.CASCADE)

    def __Str__(Self):
        return self.choicename