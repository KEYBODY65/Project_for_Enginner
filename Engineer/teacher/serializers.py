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
        fields = ['id', 'task_builder', 'task_name', 'true_answer', 'weight', 'file', 'subject']

class Create_GroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'group_name']

class Create_StudentsSerializer(serializers.ModelSerializer):
    group_name = serializers.CharField(max_length=255)
    class Meta:
        model = Student
        fields = ['id', 'student_name', 'student_surname', 'student_patronymic', 'group_name']
