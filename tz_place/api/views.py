from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView
from .serializers import PlaceSerializer
from .models import Place


# Create your views here.
class PlaceView(ListAPIView):
    serializer_class = PlaceSerializer
    queryset = Place.objects.all()

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class PlaceSearchView(ListAPIView):
    serializer_class = PlaceSerializer
    
    def get_queryset(self):
        return Place.objects.filter(name__icontains=self.kwargs['location']).order_by('-id')