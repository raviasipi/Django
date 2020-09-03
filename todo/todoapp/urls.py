from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('add_activity/', views.add_activity, name='addActivity'),
    path('get_activity/', views.get_activity, name='getActivity'),
    path('delete_activity/', views.delete_activity, name='deleteActivity'),
    path('is_user_exist/', views.is_user_exist, name='is_user_exist'),
]
