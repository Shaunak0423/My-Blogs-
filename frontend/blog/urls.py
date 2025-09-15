from django.urls import path
from .views import PostListCreate, PostDetail, MyPosts

urlpatterns = [
    path("posts/", PostListCreate.as_view(), name="post-list"),
    path("posts/<int:pk>/", PostDetail.as_view(), name="post-detail"),
    path("my-posts/", MyPosts.as_view(), name="my-posts"),
]
