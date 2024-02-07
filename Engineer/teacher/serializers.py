from rest_framework import serializers

from .models import UserModel


class Create_User(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['id', 'name', 'surname', 'email', 'password']


class LoginUser(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()