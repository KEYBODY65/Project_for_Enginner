from rest_framework.decorators import APIView
from teacher.models import Task, Student
from .serializers import *
from django.contrib.auth.models import auth
from django.contrib.auth import login
from rest_framework.exceptions import JsonResponse


class Login_student(APIView):
    def post(self, request):
        serializer = Login_StudentSerializer(data=request.data)
        if serializer.is_valid():
            stud = Student.objects.filter(student_login=serializer.validated_data['student_login']).first()
            if stud is not None:
                student_user = auth.authenticate(student_login=serializer.validated_data['student_login'],
                                                 student_password=serializer.validated_data['student_password'])
                login(request, student_user)
                return JsonResponse(data={'message': 'Student was successfully logged in!'}, status=200)
            return JsonResponse(data={'message': 'Student was`t successfully logged'}, status=400)
        return JsonResponse(data={'message': 'Invalid data'}, status=400)


class UploadAnswers_view(APIView):
    def post(self, request):
        true_answer = Answer_Serializer(data=request.data)
        if true_answer.is_valid():
            col_true, col_tasks = 0, 0
            for key, value in true_answer.validated_data['true_answers'].items():
                col_tasks += 1
                tsk = Task.objects.get(id=key)
                if tsk.true_answer == value:
                    col_true += 1
            return JsonResponse(data={'col_true': col_true, 'col_tasks': col_tasks}, status=200)
        return JsonResponse(data={'message': 'Not valid data'}, status=400)
