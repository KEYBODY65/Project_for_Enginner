from django.contrib.auth import logout
from rest_framework.decorators import APIView
from django.http import JsonResponse
from .serializers import *
from django.contrib.auth.models import auth
from django.middleware.csrf import get_token
from .models import UserModel
from django.views.decorators.csrf import ensure_csrf_cookie
from .generate_password import *
from random import randrange


class Create_user(APIView):
    def post(self, request):
        serializer = Create_UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(serializer.validated_data['password'])
            user.save()
            return JsonResponse(data={'message': 'All right'}, status=200)
        return JsonResponse(data={'message': 'Not Register'}, status=400)


class Login_user(APIView):
    def post(self, request):
        log_data = Login_UserSerializer(data=request.data)
        if log_data.is_valid():
            user = UserModel.objects.filter(email=log_data.validated_data['email']).first()
            if user is not None:
                if user.check_password(log_data.validated_data['password']):
                    user = auth.authenticate(email=log_data.validated_data['email'],
                                             password=log_data.validated_data['password'])
                    auth.login(request, user)
                    return JsonResponse(data={'message': 'All right'}, status=200)
            return JsonResponse(data={'message': 'This User is not on our database'})
        return JsonResponse(data={'message': 'Not Valid'}, status=400)


class Logout_user(APIView):

    def post(self, request):
        logout(request)
        return JsonResponse(data={'message': 'The User was logout'}, status=200)


@ensure_csrf_cookie  # для получения CSRF-токена
def get_csrf(request):
    cookies = request.COOKIES
    csrf_token = cookies.get("csrftoken", get_token(request))
    return JsonResponse(data={'csrfToken': csrf_token}, status=200)


def dash_board_data(request):
    data = UserModel.objects.get(id=request.user.id)
    return JsonResponse(data={'user_name': data.name}, status=200)


class Create_task(APIView):
    def post(self, request):
        user = UserModel.objects.get(id=request.user.id)
        request.data['task_builder'] = user.id
        task_data = Create_TaskSerializer(data=request.data)
        if task_data.is_valid():
            task = task_data.save()
            return JsonResponse(data={'message': 'Task added successfully'}, status=200)
        return JsonResponse(data={'message': 'Not valid data'}, status=400)


class Add_group(APIView):
    def post(self, request):
        user = UserModel.objects.get(id=request.user.id)
        request.data['group_builder'] = user.id
        group_data = Create_GroupsSerializer(data=request.data)
        if group_data.is_valid():
            group = group_data.save()
            return JsonResponse(data={'message': 'Group added successfully'}, status=200)
        return JsonResponse(data={'message': 'Not valid data'}, status=400)


class Add_Student(APIView):
    def post(self, request):
        user = UserModel.objects.get(id=request.user.id)
        request.data['student_teacher'] = user.id
        student_data = Create_StudentsSerializer(data=request.data)
        if student_data.is_valid():
            student = student_data.save(commit=False)
            name = student_data.validated_data.get('student_name')
            surname = student_data.validated_data.get('student_surname')
            student.student_login = generate_login(f'{surname} {name} {randrange(11)}')
            student.student_password = student.set_password(generate_password())
            student.save()
            return JsonResponse(data={'message': 'Student added successfully'}, status=200)
        return JsonResponse(data={'message': 'Not valid data'}, status=400)


def students_data(request):
    students = Student.objects.get(id=request.user.id)
    return JsonResponse(data={'students': students.name}, status=200)


class Add_Student_to_group(APIView):
    def post(self, request):
        serializer = Studentsgroups_Serializer(data=request.data)
        if serializer.is_valid():
            student_name = serializer.validated_data['student_name']
            group_name = serializer.validated_data['group_name']
            try:
                student = Student.objects.get(name=student_name)
                group = Group.objects.get(name=group_name)
                student.group = group
                student.save()
                return JsonResponse(data={'message': 'Student added into Group successfully'}, status=200)
            except Student.DoesNotExist:
                return JsonResponse(data={'message': 'Student not found'}, status=400)
            except Group.DoesNotExist:
                return JsonResponse(data={'message': 'Group not found'}, status=400)
        return JsonResponse(data={'message': 'Not valid data'}, status=400)


class Add_Test(APIView):
    def post(self, request):
        pass

    def get(self, request):
        tasks = Task.objects.get(task_builder=request.user.id)
        return JsonResponse(data={'tasks': tasks}, status=200)


class Statics_View(APIView):
    def get(self, request):
        pass
