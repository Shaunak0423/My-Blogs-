# blog/views.py
from rest_framework import generics, permissions
from .models import Posts
from .serializers import PostSerializer
from rest_framework.response import Response
from rest_framework.views import APIView

class PostListCreate(generics.ListCreateAPIView):
    queryset = Posts.objects.all().order_by("-created_at")
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        if self.request.user != self.get_object().author:
            raise PermissionError("You can only edit your own posts")
        serializer.save()

    def perform_destroy(self, instance):
        if self.request.user != instance.author:
            raise PermissionError("You can only delete your own posts")
        instance.delete()

class MyPosts(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        posts = Posts.objects.filter(author=request.user).order_by("-created_at")
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)
