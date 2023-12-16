from rest_framework import serializers
from tz_place.api.serializers import PlaceSerializer

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    place = PlaceSerializer()
    class Meta:
        model = Post
        fields = ['id', 'name',  'photo', 'description', 'place', 'is_recomended']

    