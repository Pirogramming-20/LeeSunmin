from django.db import models

# Create your models here.
class Idea(models.Model):
    title = models.CharField("제목", max_length=50)
    image = models.ImageField('이미지', blank=True, upload_to='idea/%Y%m%d')
    content = models.TextField("아이디어 설명")
    interest = models.IntegerField("아이디어 관심도", default=0)
    # 예상 개발툴
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

