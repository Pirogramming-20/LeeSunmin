from django.shortcuts import render, redirect
from .models import Idea
from .forms import IdeaForm

# Create your views here.


def main(request):
    ideas = Idea.objects.all()
    sort = request.GET.get('sort', '')
    if sort == 'name':
        ideas = Idea.objects.all().order_by('title')
    if sort == 'order':
        ideas = Idea.objects.all().order_by('created_at')
    if sort == 'recently':
        ideas = Idea.objects.all().order_by('-created_at')

    ctx = {"ideas": ideas}
    return render(request, 'idea/idea_list.html', ctx)


def detail(request, pk):
    idea = Idea.objects.get(id=pk)
    ctx = {"idea": idea}
    return render(request, 'idea/idea_detail.html', ctx)


def create(request):
    if request.method == "GET":
        form = IdeaForm()
        ctx = {"form": form}
        return render(request, 'idea/idea_create.html', ctx)
    else:
        form = IdeaForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
        return redirect('idea:main')


def delete(request, pk):
    if request.method == "POST":
        idea = Idea.objects.get(id=pk)
        idea.delete()
    return redirect('idea:main')


def update(request, pk):
    idea = Idea.objects.get(id=pk)
    if request.method == "POST":
        form = IdeaForm(request.POST, request.FILES, instance=idea)
        if form.is_valid():
            form.save()
        return redirect('idea:detail', pk)

    else:
        form = IdeaForm(instance=idea)
        ctx = {"form": form, "pk": pk}
        return render(request, 'idea/idea_update.html', ctx)
