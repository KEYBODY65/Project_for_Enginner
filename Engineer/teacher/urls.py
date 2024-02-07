from django.urls import path, include
from .views import *
app_name = 'teacher'

urlpatterns = [
    path('register/', include('main.urls')),
    path('register_data/', create_user.as_view(), name='user_create'),
    path('auth/', include('main.urls')),
    path('dashboard/', include('main.urls')),
    path('auth_data/', login_user.as_view(), name='auth_users'),
    path('new_task/', include('main.urls')),
    path('new_task_data/', create_tasks.as_view(), name='creation_tasks'),
    path('logout/', logout_user.as_view(), name='logout_user'),
    path('get_csrf/', get_csrf)
]
