from django.contrib.auth import logout
from rest_framework.decorators import APIView
from django.http import JsonResponse
from .serializers import *
from django.contrib.auth.models import auth
from django.middleware.csrf import get_token
from .models import *
from django.views.decorators.csrf import ensure_csrf_cookie
from .generate_password import *
import base64


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
                    login = auth.authenticate(email=log_data.validated_data['email'],
                                              password=log_data.validated_data['password'])
                    auth.login(request, login)
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
            task_data.save()
            return JsonResponse(data={'message': 'Task added successfully'}, status=200)
        return JsonResponse(data={'message': 'Not valid data'}, status=400)


class Current_Task(APIView):
    def post(self, request):
        task_id = Data_by_id_serializer(data=request.data)
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


class Add_Test(APIView):
    def post(self, request):
        user = UserModel.objects.get(id=request.user.id)
        request.data['test_builder'] = user.id
        serializers = Create_TestsSerializer(data=request.data)
        if serializers.is_valid():
            save_test = serializers.save()
            tasks = serializers.validated_data['task_ids']
            save_test.task_ids.add(*tasks)
            save_test.save()
            return JsonResponse(data={'message': "Test add"}, status=200)
        return JsonResponse(data={'message': 'Not valid data'}, status=400)

    def get(self, request):
        teacher_test = Test.objects.filter(test_builder=request.user.id)
        if teacher_test:
            test_id = [elem.id for elem in teacher_test]
            tests = [test.name_of_test for test in teacher_test]
            return JsonResponse(data={'tests_id': test_id, 'tests': tests}, status=200)
        return JsonResponse(data={'Message': 'Tests are None'}, status=400)


class Add_Student(APIView):
    def post(self, request):
        user = UserModel.objects.get(id=request.user.id)
        request.data['student_teacher'] = user.id
        student_data = Create_StudentsSerializer(data=request.data)
        if student_data.is_valid():
            student = student_data.save()
            name = student_data.validated_data.get('student_name')
            surname = student_data.validated_data.get('student_surname')
            patronymic = student_data.validated_data.get('student_patronymic')
            student.student_login = generate_login(f'{surname} {name} {patronymic}')
            student.student_password = generate_password()
            student.save()
            return JsonResponse(data={'message': 'Student added successfully'}, status=200)
        return JsonResponse(data={'message': 'Not valid data'}, status=400)

    def get(self, request):
        students = Student.objects.filter(student_teacher=request.user.id)
        student = dict()
        for elem in students:
            student.setdefault(elem.id, f'{elem.student_surname} {elem.student_name} {elem.student_patronymic}')
        if student:
            return JsonResponse(data={'student': student}, status=200)
        return JsonResponse(data={'Message': 'List is empty'}, status=400)


class Add_Test_to_group(APIView):
    def post(self, request):
        serializer = Testgroups_serializer(data=request.data)
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


class Add_Student_to_group(APIView):
    def post(self, request):
        serializer = Studentsgroups_Serializer(data=request.data)
        if serializer.is_valid():
            try:
                group = Group.objects.get(id=serializer.validated_data['group_id'])
                student = Student.objects.get(id=serializer.validated_data['student_id'])
                student.student_group.add(group)
                student.save()
                return JsonResponse(data={'message': 'Student added to group successfully'}, status=200)
            except Student.DoesNotExist:
                return JsonResponse(data={'message': 'Student not found'}, status=404)
            except Group.DoesNotExist:
                return JsonResponse(data={'message': 'Group not found'}, status=404)

        return JsonResponse(data={'message': 'Not valid data'}, status=400)


class Group_Students_by_group_id(APIView):
    def post(self, request):
        serializer = Id_Group_serializer(data=request.data)
        if serializer.is_valid():
            group_students = Student.objects.filter(student_group=serializer.validated_data['group_id'])
            if group_students:
                data = [f'{student.student_name} {student.student_surname}' for student in group_students]
                return JsonResponse(data={'group_students': data}, status=200)
            return JsonResponse(data={'message': 'Student not found'}, status=404)
        return JsonResponse(data={'message': 'Not valid data'}, status=400)


class Test_by_group_id(APIView):
    def post(self, request):
        serializer = Id_Group_serializer(data=request.data)
        if serializer.is_valid():
            tests_group = Test.objects.filter(group_test__id=serializer.validated_data['group_id'])
            if tests_group:
                data = {elem.id: elem.name_of_test for elem in tests_group}
                return JsonResponse(data={"test_by_group_id": data}, status=200)
            return JsonResponse(data={'message': 'Group not found'})
        return JsonResponse(data={'message': 'Group not found'})


class Group_name_by_group_id(APIView):
    def post(self, request):
        serializer = Id_Group_serializer(data=request.data)
        if serializer.is_valid():
            g_name = Group.objects.get(id=serializer.validated_data['group_id'])
            return JsonResponse(data={'group_name': g_name.group_name}, status=200)
        return JsonResponse(data={'message': 'Group not found'}, status=404)


class Test_Tasks_by_test_id(APIView):
    def post(self, request):
        serializer = Tets_Data_by_id_serializer(data=request.data)
        if serializer.is_valid():
            test_data = Test.objects.get(id=serializer.validated_data['test_id'])
            if test_data:
                tasks = [elem.id for elem in test_data.task_ids.all()]
                return JsonResponse(data={'tasks': 'xyi'}, status=200)
            return JsonResponse(data={'message': 'test_data is empty'}, status=404)
        return JsonResponse(data={'message': 'Not valid data'}, status=400)


class Teacher_tasks(APIView):
    def get(self, request):
        tasks_data = Task.objects.filter(task_builder=request.user.id)
        if tasks_data:
            tasks_names = [task.task_name for task in tasks_data]
            task_ids = [elem.id for elem in tasks_data]
            return JsonResponse(data={'task_ids': task_ids, 'task_names': tasks_names}, status=200)
        return JsonResponse(data={'Message': 'Lists is empty'}, status=400)


class Student_Login_and_Password_by_group_id(APIView):
    def post(self, request):
        log = Id_Group_serializer(data=request.data)
        if log.is_valid():
            logins = Student.objects.filter(student_group=log.validated_data['group_id'])
            if logins:
                logins_passwords = {
                    f"{elem.student_name} {elem.student_surname}": f"Логин:{elem.student_login} Пароль:{elem.student_password}"
                    for elem in logins}
                return JsonResponse(data={'logins_passwords': logins_passwords}, status=200)
            return JsonResponse(data={'Message': 'Logins is null'}, status=404)
        return JsonResponse(data={'Message': 'Not valid data'}, status=400)


class Student_group_by_id(APIView):  # группы
    def post(self, request):
        serializer = Data_by_id_serializer(data=request.data)
        if serializer.is_valid():
            students = Student.objects.get(id=serializer.validated_data['id'])
            if students:
                groups = {elem.id: elem.group_name for elem in students.student_group.all()}
                return JsonResponse(data={'groups': groups}, status=200)
            return JsonResponse(data={'list of groups if null'}, status=404)
        return JsonResponse(data={'message': 'Not valid data'}, status=400)


class Teacher_Name(APIView):
    def post(self, request):
        serializer = Id_Group_serializer(data=request.data)
        if serializer.is_valid():
            teacher = Group.objects.get(id=serializer.validated_data['group_id'])
            if teacher:
                teacher_fio = teacher.group_builder
                return JsonResponse(data={'teacher_name': teacher_fio.name, 'teacher_surname': teacher_fio.surname},
                                    status=200)
            return JsonResponse(data={'message': 'Teacher is Null'}, status=404)
        return JsonResponse(data={'message': 'Not valid data'}, status=400)


class Student_id_by_login(APIView):  # айдишники
    def post(self, request):
        serializer = Student_id_Serializer(data=request.data)
        if serializer.is_valid():
            student_id = Student.objects.filter(student_login=serializer.validated_data["login"])
            if student_id:
                return JsonResponse(data={'student_id': student_id[0].id}, status=200)
            return JsonResponse(data={'message': 'Id is Null'}, status=404)
        return JsonResponse(data={'message': 'Not valid data'}, status=400)


class Statics_View(APIView):
    def get(self, request):
        statistic = Statistic.objects.all()
        data = dict()
        for elem in statistic:
            data.setdefault(elem.student, elem.col_balls)

        return JsonResponse(data={'data': data}, status=200)
