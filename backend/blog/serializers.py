from rest_framework import serializers
from .models import Posts

class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source="author.username")
    image = serializers.ImageField(use_url=True, required=False, allow_null=True)

    class Meta:
        model = Posts
        fields = ["id", "title", "content", "author", "author_username", "image", "created_at"]
        read_only_fields = ["author"]
