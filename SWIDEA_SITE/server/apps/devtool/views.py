from django.shortcuts import render, redirect
from .models import Devtool
from .forms import DevtoolForm

# Create your views here.
def devtool_list(request):
    devtools = Devtool.objects.all()
    ctx = {"devtools": devtools}
    return render(request, 'devtool/devtool_list.html', ctx)

def detail(request, pk):
    devtool = Devtool.objects.get(id=pk)
    ctx = {"devtool": devtool}
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
