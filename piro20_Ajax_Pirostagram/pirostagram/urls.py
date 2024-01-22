from django.urls import path
from . import views

app_name = 'pirostagram'

urlpatterns = [
    path('', views.main, name='main'),
    path('posts/create/', views.create, name='create'),
    # path('posts/detail/<int:pk>', views.detail, name='detail'),
    # path('posts/update/<int:pk>', views.update, name='update'),
    # path('posts/delete/<int:pk>', views.delete, name='delete'),
    path('comments/create/', views.comment_create, name="comments/create/"),
    path('comments/delete/<int:pk>/', views.comment_delete),
    path('like/<int:pk>/', views.like),
]
