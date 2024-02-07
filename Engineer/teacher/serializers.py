from rest_framework import serializers

from .models import *


class Create_User(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['id', 'name', 'surname', 'email', 'password']


class LoginUser(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class Create_Task(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'task_builder', 'task_name', 'weight', 'file', 'subject']
