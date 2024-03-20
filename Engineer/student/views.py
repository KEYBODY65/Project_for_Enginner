from rest_framework.decorators import APIView
from teacher.models import Student, Test, Statistic
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


def logout_student(request):
    logout(request)
    return JsonResponse({'message': 'Student was logout'})


class StudentStatistics_view(APIView):
    def post(self, request):
        pass


class UploadAnswers_view(APIView):
    def post(self, request):
        true_answers = Answer_Serializer(data=request.data)
        student = Student.objects.get(id=1)
        if true_answers.is_valid():
            scores_col, iteration = 0, 0
            test = Test.objects.get(id=true_answers.validated_data['test_id'])
            task = test.task_ids.all()
            for i in task:
                if i.true_answer == true_answers.validated_data['true_answers'][iteration]:
                    scores_col += i.weight
                    iteration += 1
                elif true_answers.validated_data['true_answers'][iteration] == '-':
                    iteration += 1
                else:
                    iteration += 1
            statistics = Statistic(student=student, col_balls=scores_col)
            statistics.save()
            return JsonResponse(data={'score': scores_col}, status=200)
        return JsonResponse(data={'message': 'Not valid data'}, status=400)
