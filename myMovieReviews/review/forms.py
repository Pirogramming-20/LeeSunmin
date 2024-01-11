from django import forms
from .models import Review

class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ["title", "release_year", "genre", "score", "running_time",
                  "content", "director", "main_actor",  ]

        widgets = {
            "title": forms.TextInput(attrs={"class": "review-create-item"}),
            "release_year": forms.TextInput(attrs={"class": "review-create-item"}),
            "genre": forms.TextInput(attrs={"class": "review-create-item"}),
            "score": forms.TextInput(attrs={"class": "review-create-item"}),
            "director": forms.TextInput(attrs={"class": "review-create-item"}),
            "main_actor": forms.TextInput(attrs={"class": "review-create-item"}),
            "running_time": forms.TextInput(attrs={"class": "review-create-item"}),
            "content": forms.Textarea(attrs={"class": "review-create-item", "rows": 10}),
        }

        labels = {
            "title": "제목",
            "release_year": "개봉년도",
            "genre": "장르",
            "score": "별점",
            "running_time": "러닝타임",
            "content": "리뷰",
            "director": "감독",
            "main_actor": "주연",
        }
