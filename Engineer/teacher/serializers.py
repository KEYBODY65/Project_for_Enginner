from rest_framework import serializers

from .models import *


class Create_UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['id', 'name', 'surname', 'email', 'password']


class Login_UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class Create_TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'task_builder', 'task_name', 'task_description', 'true_answer', 'weight', 'file', 'subject']


class Task_View(serializers.Serializer):
    id = serializers.IntegerField()


class Test_View(serializers.Serializer):
    id = serializers.IntegerField()


class Create_GroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'group_builder', 'group_name']


class Studentsgroups_Serializer(serializers.Serializer):
    group_id = serializers.IntegerField()
    student_id = serializers.CharField(max_length=255)


class Testgroups_serializer(serializers.Serializer):
    group_id = serializers.IntegerField()
    test_id = serializers.IntegerField()


class GroupsName_serializer(serializers.Serializer):
    group_id = serializers.IntegerField()


class StudentGroup_Serializer(serializers.Serializer):
    group_id = serializers.IntegerField()


class Create_StudentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'student_name', 'student_surname', 'student_teacher']


class Student_by_login(serializers.Serializer):
    id = serializers.IntegerField()

class Student_id_Serializer(serializers.Serializer):
    login = serializers.CharField()

class LoginsPassword_Serializers(serializers.Serializer):
    group_id = serializers.IntegerField()


class Create_TestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ['id', 'test_builder', 'name_of_test', 'task_ids']
