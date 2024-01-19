from django.urls import path
from .views import create_user, get_csrf, login_user, logout_user

app_name = 'teacher'

urlpatterns = [
    path('register/', create_user.as_view(), name='user_create'),
    path('auth/', login_user.as_view(), name='auth_users'),
    path('logout/', logout_user.as_view(), name='logout_user'),
    path('get_csrf/', get_csrf)
]
