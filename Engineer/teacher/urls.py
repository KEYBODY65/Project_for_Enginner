from django.urls import path, include
from .views import *

app_name = 'teacher'

urlpatterns = [
    path('register/', include('main.urls')),
    path('register_data/', Create_user.as_view(), name='user_create'),
    path('auth/', include('main.urls')),
    path('auth_data/', Login_user.as_view(), name='auth_users'),
    path('dashboard/', include('main.urls')),
    path('dashboard/new_task/', include('main.urls')),
    path('new_task_data/', Create_task.as_view(), name='creation_tasks'),
    path('dashboard/groups/', include('main.urls')),
    path('dashboard/groups/group', include('main.urls')),
    path('new_group_data/', Add_group.as_view(), name='creation_groups'),
    path('dashboard/add_student', include('main.urls')),
    path('add_student_data/', Add_Student.as_view(), name='add_student'),
    path('dashboard/add_test/', include('main.urls')),
    path('add_test_data/', Add_Test.as_view(), name='add_test'),
    path('group_student/', Group_Students_by_group_id.as_view(), name='grop_student'),
    path('dashboard/add_students_to_group', include('main.urls')),
    path('current_task/', Current_Task().as_view(), name='current_task_by_task_id'),
    path('dashboard/groups/group_name/', Group_name_by_group_id.as_view(), name='group_name'),
    path('dashboard/add_test_to_group_data/', Add_Test_to_group.as_view(), name='add_test_to_group'),
    path('dashboard/add_students_to_group_data/', Add_Student_to_group.as_view(), name='add_students_to_group'),
    path('teacher_tasks_data/', Teacher_tasks.as_view(), name='all of current teacher_tasks'),
    path('test_tasks/', Test_Tasks_by_test_id.as_view(), name='all of tasks of current test by test id'),
    path('test_by_group/', Test_by_group_id.as_view(), name='all of test from current group'),
    path('dashboard/students_logins', include('main.urls')),
    path('students_logins/', Student_Login_and_Password_by_group_id.as_view(), name='all of student logins of current group'),
    path('students_groups/', Student_group_by_id.as_view(), name='all of group'),
    path('students_data/', Student_id_by_login.as_view(), name='all of students data'),
    path('teacher_name_by_id/', Teacher_Name.as_view(), name='teacher name by id'),
    path('get_csrf/', get_csrf)
]
