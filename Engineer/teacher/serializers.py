from rest_framework import serializers

from .models import User_model


class Create_User(serializers.ModelSerializer):
    class Meta:
        model = User_model
        fields = ['id', 'name', 'surname', 'email', 'password']


class LoginUser(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()