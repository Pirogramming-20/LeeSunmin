from django.urls import path
from . import views

urlpatterns = [
    path('', view.post_list, name='post_list')
]