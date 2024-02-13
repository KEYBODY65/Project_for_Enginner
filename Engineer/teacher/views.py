from django.contrib.auth import login, logout
from rest_framework.decorators import APIView
from django.http import JsonResponse
from .serializers import *
from django.contrib.auth.models import auth
from django.middleware.csrf import get_token
from .models import UserModel
from django.views.decorators.csrf import ensure_csrf_cookie
from .generate_password import *


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
    return JsonResponse(data={'csrfToken': csrf_token})

def dash_board_data(request):
    data = UserModel.objects.get(id=request.user.id)
    return JsonResponse({'user_name': data.name})

class Create_task(APIView):
    def post(self, request):
        user = UserModel.objects.get(id=request.user.id)
        request.data['task_builder'] = user.id
        task_data = Create_TaskSerializer(data=request.data)
        if task_data.is_valid():
            task = task_data.save()
            return JsonResponse({'message': 'Task added successfully'}, status=200)
        return JsonResponse({'message': 'Not valid data'}, status=400)


class Add_group(APIView):
    def post(self, request):
        group_data = Create_GroupsSerializer(data=request.data)
        if group_data.is_valid():
            group = group_data.save()
            group.group_builder = UserModel.objects.get(id=request.user.id)
            group.save()
            return JsonResponse({'message': 'Group added successfully'}, status=200)
        return JsonResponse({'message': 'Not valid data'}, status=400)


class Add_Student(APIView):
    def post(self, request):
        student_data = Create_StudentsSerializer(data=request.data)
        if student_data.is_valid():
            student = student_data.save(commit=False)
            student.student_teacher = UserModel.objects.get(id=request.user.id)
            student.student_group = Group.objects.get(student_group=student_data.validated_data.get('group_name'))
            name = student_data.validated_data.get('student_name')
            surname = student_data.validated_data.get('student_surname')
            patronymic = student_data.validated_data.get('student_patronymic')
            student.student_login = generate_login(f'{surname} {name} {patronymic}')
            student.student_password = student.set_password(generate_password())
            student.save()
            return JsonResponse({'message': 'Student added successfully'}, status=200)
        return JsonResponse({'message': 'Not valid data'}, status=400)


class Add_Test(APIView):
    def post(self, request):
        pass


class Statics_View(APIView):
    def post(self, request):
        pass


