from django.contrib import admin

# Register your models here.
from .models import question,choice

admin.site.register(question)
admin.site.register(choice)