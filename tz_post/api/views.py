from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView
from .serializers import PostSerializer
from .models import Post


# Create your views here.
class PostView(ListAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all().order_by('-id')
    pagination_class = None

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'results':serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class PostListView(ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        location = self.kwargs['location']
        return Post.objects.filter(place__location=location).order_by('-id')
    

class RecomendedListView(ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(is_recomended=True).order_by('-id')
    
# class PostCreateView(CreateAPIView):
#     serializer_class = PostSerializer
#     queryset = Post.objects.all()