from django.db import models
from apps.devtool.models import Devtool

# Create your models here.


class Idea(models.Model):
    title = models.CharField("아이디어 명", max_length=50)
    image = models.ImageField('이미지', blank=True, upload_to='idea/%Y%m%d')
    content = models.TextField("아이디어 설명")
    interest = models.IntegerField("아이디어 관심도", default=0)
    devtool = models.ForeignKey(
        Devtool, on_delete=models.CASCADE, verbose_name="예상 개발툴")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class IdeaStar(models.Model):
    idea = models.OneToOneField(
        Idea, on_delete=models.CASCADE, related_name='ideastar')

    def __str__(self):
        return f"[Bookmark] {self.idea.title}"
