from django.conf import settings
from django.db import models
from django.utils import timezone

# Create your models here.
class Post(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) # 다른 모델에 대한 링크
    title = models.CharField(max_length = 200) # 글자수가 제한된 text
    text = models.TextField() # 글자수 제한되지 않은 text
    created_date = models.DateTimeField(default=timezone.now) # 날짜와 시간
    published_date = models.DateTimeField(blank=True, null=True) 

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title
