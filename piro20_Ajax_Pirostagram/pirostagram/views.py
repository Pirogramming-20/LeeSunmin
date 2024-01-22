from django.shortcuts import render, redirect
from .models import *
from .forms import *
import json
from users.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

# Create your views here.
def main(request):
    posts = Post.objects.all()
    post_info = []
    for post in posts:
        post_info.append({"post": post, "comments": Comment.objects.filter(post=post)})
    context = {"post_info": post_info}
    return render(request, 'pirostagram/main.html', context)

def create(request):
    if request.method == "POST":
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.writer = request.user
            form.save()
            return redirect('pirostagram:main')
    else:
        form = PostForm()
        context = {
            'form': form,
        }
    return render(request, 'pirostagram/post_create.html', context)

def delete(request, pk):
    if request.method == "POST":
        post = Post.objects.get(id=pk)
        if post.writer == request.user:
            post.delete()
            return redirect('pirostagram:main')
        else:
            return redirect('pirostagram:main')

def update(request, pk):
    if request.method == "POST":
        post = Post.objects.get(id=pk)
        form = PostForm(request.POST, request.FILES, instance=post)
        if form.is_valid():
            form.save()
            return redirect('pirostagram:main')
    else:
        post = Post.objects.get(id=pk)
        form = PostForm(instance=post)
        context = {
            'form': form,
            'pk': pk,
        }
        print(context)
        return render(request, 'pirostagram/post_update.html', context)

# 1. 댓글 작성
@csrf_exempt
@login_required
def comment_create(request):
    if request.method == "POST":    
        req = json.loads(request.body)
        post_id = req['id']
        comment_content = req['comment']
        post = Post.objects.get(id=post_id)
        comment = Comment.objects.create(content=comment_content, writer=request.user, post=post)
        return JsonResponse({'id': post_id, 'comment': comment_content, 'writer': comment.writer.username, 'comment_id': comment.pk})

# 2. 댓글 삭제
@csrf_exempt
@login_required
def comment_delete(request, pk):
    if request.method == "POST":
        req = json.loads(request.body)
        comment_id = req['comment_id']
        comment = Comment.objects.get(id=comment_id)
        if comment.writer == request.user:            
            comment.delete()
            return JsonResponse({'comment_id': comment_id})
        else:
            return JsonResponse({'comment_id': None})

# 좋아요 취소 및 좋아요
@csrf_exempt
def like(request, pk):
    post = Post.objects.get(id=pk)
    req = json.loads(request.body)
    request_user = req['request_user']
    request_user = User.objects.get(username=request_user)
    if post.like_users.filter(pk=request_user.pk).exists():
        post.like_users.remove(request.user)
        return JsonResponse({'post_id': pk, 'type': 'unlike'})
    else:
        post.like_users.add(request.user)
        return JsonResponse({'post_id': pk, 'type': 'like'})
