from rest_framework.decorators import APIView
from teacher.models import Student
from .serializers import *
from django.contrib.auth import logout
from rest_framework.exceptions import JsonResponse

class Login_student(APIView):
    def post(self, request):
        serializer = Login_StudentSerializer(data=request.data)
        if serializer.is_valid():
            stud = Student.objects.filter(login=serializer.validated_data['login']).first()
            if stud is not None:
                if stud.check_password(serializer.validated_data['password']):
                    stud = auth.authenticate(email=serializer.validated_data['email'],
                                             password=serializer.validated_data['password'])
                    auth.login(request, stud)
                    return JsonResponse(data={'message': 'Student was successfully logged in!'}, status=200)
                return JsonResponse(data={'message': 'Student was`t successfully logged'}, status=400)
            return JsonResponse(data={'message': 'This Student is not on database'}, status=400)
        return JsonResponse(data={'message': 'Invalid data'}, status=400)

def logout_student(request):
     logout(request)
     return JsonResponse({'message': 'Student was logout'})


class StudentStatistics_view(APIView):
    def post(self, request):
        pass
class UploadAnswers_view(APIView):
    def post(self, request, id):
        # true_answ = Answer_Serializer(data=request.data)
        # if true_answ.is_valid():
        d = []
        true_answers = Student.objects.filter(id=id)
        for i in true_answers:
            d.append(i)
        return JsonResponse({'answers': d}, status=200)







