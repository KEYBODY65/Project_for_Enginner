from django.contrib.auth import logout
from rest_framework.decorators import APIView
from django.http import JsonResponse
from .serializers import *
from django.contrib.auth.models import auth
from django.middleware.csrf import get_token
from .models import *
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

    def get(self, request):
        data = UserModel.objects.get(id=request.user.id)
        return JsonResponse(data={'user_name': data.name}, status=200)


class Logout_user(APIView):

    def post(self, request):
        logout(request)
        return JsonResponse(data={'message': 'The User was logout'}, status=200)


@ensure_csrf_cookie  # для получения CSRF-токена
def get_csrf(request):
    cookies = request.COOKIES
    csrf_token = cookies.get("csrftoken", get_token(request))
    return JsonResponse(data={'csrfToken': csrf_token}, status=200)


class Create_task(APIView):
    def post(self, request):
        user = UserModel.objects.get(id=request.user.id)
        request.data['task_builder'] = user.id
        task_data = Create_TaskSerializer(data=request.data)
        if task_data.is_valid():
            task = task_data.save()
            return JsonResponse(data={'message': 'Task added successfully'}, status=200)
        return JsonResponse(data={'message': 'Not valid data'}, status=400)

    def get(self, request):
        task_id = Task_View(data=request.data)
        if task_id.is_valid():
            data = Task.objects.get(task_id.validated_data['task_id'])
            task_data = {
                'task_id': data.id,
                'task_name': data.task_name,
                'task_description': data.task_description,
                'weight': data.weight,
                'file': data.file
            }
            if task_data:
                return JsonResponse(data={'task': task_data}, status=200)
            return JsonResponse(data={'message': 'Dictionary is empty'}, status=400)
        return JsonResponse(data={'Message': 'Not valid data'}, status=400)


class Add_group(APIView):
    def post(self, request):
        user = UserModel.objects.get(id=request.user.id)
        request.data['group_builder'] = user.id
        group_data = Create_GroupsSerializer(data=request.data)
        if group_data.is_valid():
            group = group_data.save()
            return JsonResponse(data={'message': 'Group added successfully'}, status=200)
        return JsonResponse(data={'message': 'Not valid data'}, status=400)

    def get(self, request):
        group_data = Group.objects.filter(group_builder=request.user.id)
        groups = []
        groups_ids = []
        for elem in group_data:
            groups.append(elem.group_name)
            groups_ids.append(elem.id)
        if groups:
            return JsonResponse(data={'groups': groups, 'groups_ids': groups_ids}, status=200)
        return JsonResponse(data={'Message': 'List is empty'}, status=400)


class Add_Student(APIView):
    def post(self, request):
        user = UserModel.objects.get(id=request.user.id)
        request.data['student_teacher'] = user.id
        student_data = Create_StudentsSerializer(data=request.data)
        if student_data.is_valid():
            student = student_data.save()
            name = student_data.validated_data.get('student_name')
            surname = student_data.validated_data.get('student_surname')
            student.student_login = generate_login(f'{surname} {name}')
            student.student_password = generate_password()
            student.save()
            return JsonResponse(data={'message': 'Student added successfully'}, status=200)
        return JsonResponse(data={'message': 'Not valid data'}, status=400)

    def get(self, request):
        students = Student.objects.filter(student_teacher=request.user.id)
        student = []
        for elem in students: student.append(f'{elem.student_surname}{elem.student_name}')
        if student:
            return JsonResponse(data={'students': student}, status=200)
        return JsonResponse(data={'Message': 'List is empty'}, status=400)


class Add_Student_to_group(APIView):
    def post(self, request):
        serializer = Studentsgroups_Serializer(data=request.data)
        print(serializer.initial_data)
        if serializer.is_valid():
            try:
                group = Group.objects.filter(id=serializer.validated_data['group_id'])
                student = Student.objects.filter(name=serializer.validated_data['student_name'])
                student, group = student[0], group[0]
                student.student_group = group
                return JsonResponse(data={'message': 'Student added to group successfully'}, status=200)
            except Student.DoesNotExist:
                return JsonResponse(data={'message': 'Student not found'}, status=404)
            except Group.DoesNotExist:
                return JsonResponse(data={'message': 'Group not found'}, status=404)

        return JsonResponse(data={'message': 'Not valid data'}, status=400)


class Add_Test_to_group(APIView):
    def post(self, request):
        serializer = Testgroups_serializer(data=request.data)
        print(serializer.initial_data)
        if serializer.is_valid():
            try:
                group = Group.objects.get(id=serializer.validated_data['group_id'])
                test = Test.objects.get(id=serializer.validated_data['test_id'])
                test.group_test = group
                test.save()
                return JsonResponse(data={'message': 'Test added to group successfully'}, status=200)
            except Test.DoesNotExist:
                return JsonResponse(data={'message': 'Test not found'}, status=404)
            except Group.DoesNotExist:
                return JsonResponse(data={'message': 'Group not found'}, status=404)

        return JsonResponse(data={'message': 'Not valid data'}, status=400)


class Group_name(APIView):
    def post(self, request):
        serializer = GroupsName_serializer(data=request.data)
        print(serializer.initial_data)
        if serializer.is_valid():
            g_name = Group.objects.get(id=serializer.validated_data['group_id'])
            return JsonResponse(data={'group_name': g_name.group_name}, status=200)
        return JsonResponse(data={'message': 'Group not found'}, status=404)

class Teacher_tasks(APIView):
    def get(self, request):
        tasks_data = Task.objects.filter(task_builder=request.user.id)
        task_ids, tasks_names = [], []
        for task in tasks_data:
            tasks_names.append(task.task_name)
            task_ids.append(task.id)
        if all([tasks_names, task_ids]):
            return JsonResponse(data={'task_ids': task_ids, 'task_names': tasks_names}, status=200)
        return JsonResponse(data={'Message': 'Lists is empty'}, status=400)


class Add_Test(APIView):
    def post(self, request):
        user = UserModel.objects.get(id=request.user.id)
        request.data['test_builder'] = user.id
        serializers = Create_TestsSerializer(data=request.data)
        print(serializers.initial_data)
        if serializers.is_valid():
            save_test = serializers.save()
            tasks = serializers.validated_data['task_ids']
            save_test.task_ids.add(*tasks)
            save_test.save()
            return JsonResponse(data={'message': "Test add"}, status=200)
        return JsonResponse(data={'message': 'Not valid data'}, status=400)

    def get(self, request):
        tests_data = Test.objects.filter(test_builder=request.user.id)
        tests = []
        tests_id = []
        for elem in tests_data:
            tests.append(elem.name_of_test)
            tests_id.append(elem.id)
        if all([tests, tests_id]):
            return JsonResponse(data={'tests': tests, 'tests_id': tests_id}, status=200)
        return JsonResponse(data={'Message': 'Lists is empty'}, status=400)




class Statics_View(APIView):
    def get(self, request):
        statistic = Statistic.objects.all()
        data = dict()
        for elem in statistic:
            data.setdefault(elem.student, elem.col_balls)

        return JsonResponse(data={'data': data}, status=200)

