from django.conf.urls.static import static
from django.urls import path, include
from .views import PostListView, RecomendedListView

from .views import PostView 

urlpatterns = [

    path('posts', PostView.as_view(), name='post-list-create'),
    path('posts/<str:location>/', PostListView.as_view(), name='post-list'),
    path('recommended', RecomendedListView.as_view(), name='recommended-list'),
   
]