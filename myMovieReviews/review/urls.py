from django.urls import path
from .views import *

urlpatterns = [
    path("", reviews_list),
    path("<int:pk>", review_detail),
]