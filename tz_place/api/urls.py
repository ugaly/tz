from django.conf.urls.static import static
from django.urls import path, include

from .views import PlaceView, PlaceSearchView

urlpatterns = [

    path('places', PlaceView.as_view(), name='place-list-create'),
    path('places/<str:location>/', PlaceSearchView.as_view(), name='place-list-create'),
   
]