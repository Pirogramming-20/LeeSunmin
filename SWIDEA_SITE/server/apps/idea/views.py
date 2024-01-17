from django.shortcuts import render, redirect
from django.http import JsonResponse  
from .models import Idea, IdeaStar
from .forms import IdeaForm


def main(request):
    ideas = Idea.objects.all()
    sort = request.GET.get('sort', '')
    if sort == 'name':
        ideas = Idea.objects.all().order_by('title')
    if sort == "bookmark":
        ideas = Idea.objects.all().order_by('-ideastar')
    if sort == 'order':
        ideas = Idea.objects.all().order_by('created_at')
    if sort == 'recently':
        ideas = Idea.objects.all().order_by('-created_at')
    if sort == 'interest':
        ideas = Idea.objects.all().order_by('-interest')

    ctx = {"ideas": ideas}
    return render(request, 'idea/idea_list.html', ctx)

def bookmark(request, pk):
    if request.method == "POST":
        idea = Idea.objects.get(id=pk)
        try:
            star_idea = idea.ideastar
            star_idea.delete()
            bookmark = False

        except Idea.ideastar.RelatedObjectDoesNotExist:
            IdeaStar.objects.create(idea=idea)
            bookmark = True

        idea.save()
    return JsonResponse({'pk': pk, 'bookmark': bookmark})

def change_interest(request, pk, delta):
    if request.method == 'POST':
        idea = Idea.objects.get(id=pk)
        idea.interest += int(delta)
        idea.save()
        return JsonResponse({'interest': idea.interest})

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
