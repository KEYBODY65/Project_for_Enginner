from rest_framework.decorators import APIView
from teacher.models import Group
from .serializers import Login_StudentSerializer
from django.contrib.auth import login, logout
from rest_framework.exceptions import JsonResponse

class Login_student(APIView):
    def post(self, request):
        data = Login_StudentSerializer(data=request.data)
        if data.is_valid():
            stud = Group.objects.filter(login=data.validated_data['login']).first()
            if stud is not None:
                if stud.check_password(data.validated_data['password']):
                    login(request, stud)
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



