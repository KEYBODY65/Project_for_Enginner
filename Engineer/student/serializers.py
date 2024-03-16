from rest_framework import serializers


class Login_StudentSerializer(serializers.Serializer):
    student_login = serializers.CharField(max_length=255)
    student_password = serializers.CharField(max_length=255)


class Answer_Serializer(serializers.Serializer):
    true_answers = serializers.ListField()