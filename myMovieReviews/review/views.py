from django.shortcuts import render
from .models import *

# Create your views here.
def reviews_list(request):
    reviews = Review.objects.all()
    context = {
        "reviews": reviews
    }
    return render(request, "review/reviews_list.html", context)