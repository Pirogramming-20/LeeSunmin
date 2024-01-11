from django.shortcuts import render, redirect
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


def review_create(request):
    if request.method == "POST":
        Review.objects.create(
            title=request.POST["title"],
            release_year=request.POST["release_year"],
            genre=request.POST["genre"],
            score=request.POST["score"],
            director=request.POST["director"],
            main_actor=request.POST["main_actor"],
            running_time=request.POST["running_time"],
            content=request.POST["content"],
        )
        return redirect("/review")
    return render(request, "review/review_create.html")
