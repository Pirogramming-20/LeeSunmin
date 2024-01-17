from django.shortcuts import render, redirect
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from .models import Devtool
from .forms import DevtoolForm

# Create your views here.
def devtool_list(request):
    search_txt = request.GET.get("search_txt", '')
    devtools = Devtool.objects.all()
    page = request.GET.get('page', '')

    if search_txt:
        devtools = Devtool.objects.filter(name__contains=search_txt)

    paginator = Paginator(devtools, 6)

    try:
        page_obj = paginator.page(page)
    except PageNotAnInteger:
        page = 1
        page_obj = paginator.page(page)
    except EmptyPage:
        page = paginator.num_pages
        page_obj = paginator.page(page)

    ctx = {"devtools": devtools, "page_obj": page_obj,
           "paginator": paginator, "search_txt": search_txt}
    return render(request, 'devtool/devtool_list.html', ctx)

def detail(request, pk):
    devtool = Devtool.objects.get(id=pk)    
    all_ideas = devtool.idea_set.all()  # 역참조
    ctx = {"devtool": devtool, "related_ideas": all_ideas}
    return render(request, 'devtool/devtool_detail.html', ctx)

def create(request):    
    if request.method == "GET":
        form = DevtoolForm()
        ctx = {"form": form}
        return render(request, 'devtool/devtool_create.html', ctx)
    else:
        form = DevtoolForm(request.POST)
        if form.is_valid():
            form.save()
        return redirect('devtool:list')
    
def delete(request, pk):
    if request.method == "POST":
        devtool = Devtool.objects.get(id=pk)
        devtool.delete()
    return redirect('devtool:list')

def update(request, pk):
    devtool = Devtool.objects.get(id=pk)
    if request.method == "GET":
        form = DevtoolForm(instance=devtool)
        ctx = {"form": form, "pk": pk}
        return render(request, 'devtool/devtool_update.html', ctx)
    else:
        form = DevtoolForm(request.POST, instance=devtool)
        if form.is_valid():
            form.save()
        return redirect('devtool:detail', pk=pk)
