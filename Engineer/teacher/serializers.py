from rest_framework import serializers

from .models import UserModel


class Create_User(serializers.Serializer):
    name = serializers.CharField()
    surname = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()


class LoginUser(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()