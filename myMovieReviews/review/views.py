from django.shortcuts import render
from .models import *

# Create your views here.
def reviews_list(request):
    reviews = Review.objects.all()
    context = {
        "reviews": reviews
    }
    return render(request, "review/reviews_list.html", context)

def review_detail(request, pk):
    review = Review.objects.get(id=pk)
    context = {
        "review": review
    }
    return render(request, "review/review_detail.html", context)