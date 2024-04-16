from rest_framework.decorators import APIView
from teacher.models import Task, Student
from .serializers import *
from django.contrib.auth.models import auth
from django.contrib.auth import login, logout
from django.contrib.auth import logout
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
        true_answer.is_valid()
        print(true_answer.errors)
        if true_answer.is_valid():
            tsk = Task.objects.get(id=true_answer.validated_data['task_id'])
            if tsk is not None:
                tru_answ = true_answer.validated_data['true_answers']
                if tsk.true_answer == tru_answ:
                    return JsonResponse(data={'True_of_False': 1}, status=200)
                return JsonResponse(data={'True_of_False': 0}, status=200)
            return JsonResponse(data={'message': 'task is None'}, status=404)
        return JsonResponse(data={'message': 'Not valid data'}, status=400)
