from django.db import models

# Create your models here.
class Post(models.Model):
    content = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    photo = models.ImageField('이미지', blank=True, upload_to='posts/%Y%m%d')
    writer = models.ForeignKey('users.User', on_delete=models.CASCADE)
    like_users = models.ManyToManyField('users.User', related_name='like_posts', default=0)

class Comment(models.Model):
    content = models.CharField(max_length=200)
    writer = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='writer')
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='post')
    created_at = models.DateTimeField(auto_now_add=True)
