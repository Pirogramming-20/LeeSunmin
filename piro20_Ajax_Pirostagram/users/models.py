from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    username = models.CharField('이름', max_length=20, unique=True)
    desc = models.TextField('본인 소개', blank=True, null=True)

    def __str__(self):
        return self.username
