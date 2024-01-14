from django.urls import path
from .views import APIView

app_name = 'teacher'

urlpatterns = [
    path('register', APIView.as_view(), name='user_create'),
]
