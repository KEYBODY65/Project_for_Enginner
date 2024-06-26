from django.urls import path, include
from .views import *

app_name = 'student'


urlpatterns = [
    path('student_login/', include('main.urls')),
    path('student_login_data/', Login_student.as_view(), name='logining_students'),
    path('upload_answers/', UploadAnswers_view.as_view(), name='upload_answers'),
    path('dashboard/', include('main.urls')),
    path('dashboard/group/', include('main.urls')),
    path('dashboard/group/test/', include('main.urls'))
]
