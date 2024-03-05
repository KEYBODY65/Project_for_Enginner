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
    student_group = serializers.CharField(max_length=255)
    student_name = serializers.CharField(max_length=255)


class Create_StudentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'student_name', 'student_surname', 'student_teacher']


class Create_TestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ['id', 'test_builder', 'name_of_test', 'task_ids']
