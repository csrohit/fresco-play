from django.http import HttpResponse

def home(request):
    #Write code implementation here
    return HttpResponse("Welcome to webpoll home!")