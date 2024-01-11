from django.shortcuts import render, redirect
from .models import *
from .forms import ReviewForm

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
        form = ReviewForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("/review")
    else:
        form = ReviewForm()
        context = {
            "form": form
        }
        return render(request, "review/review_create.html", context)


