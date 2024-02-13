from django.urls import path, include
from .views import *
app_name = 'teacher'

urlpatterns = [
    path('register/', include('main.urls')),
    path('register_data/', Create_user.as_view(), name='user_create'),
    path('auth/', include('main.urls')),
    path('auth_data/', Login_user.as_view(), name='auth_users'),
    path('logout/', Logout_user.as_view(), name='logout_user'),
    path('dashboard/', include('main.urls')),
    path('dashboard/new_task/', include('main.urls')),
    path('new_task_data/', Create_task.as_view(), name='creation_tasks'),
    path('dashboard/new_group/', include('main.urls')),
    path('new_group_data/', Add_group.as_view(), name='creation_groups'),
    path('dashboard/add_student', include('main.urls')),
    path('add_student_data/', Add_Student.as_view(), name='add_student'),
    path('dashboard/add_test/', include('main.urls')),
    path('add_test_data/', Add_Test.as_view(), name='add_test'),
    path('dashboard_json/', dash_board_data, name='dash_board'),
    path('get_csrf/', get_csrf)
]
