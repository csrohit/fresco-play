from django.db import models

# Create your models here.
class question(models.Model):
    questionname = models.CharField(max_length=200)
    pubdate = models.DateTimeField("Published Date")

    def __str__(self):
        return self.questionname
    
class choice(models.Model):
    choicename = models.CharField(max_length=200)
    vote = models.IntegerField(default=0)
    quest = models.ForeignKey(question, on_delete = models.CASCADE)

    def __Str__(Self):
        return self.choicename