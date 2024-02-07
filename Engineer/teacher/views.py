from django.contrib.auth import login, logout
from rest_framework.decorators import APIView
from django.http import JsonResponse
from .serializers import *
from django.middleware.csrf import get_token
from .models import UserModel
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie


class create_user(APIView):
    def post(self, request):
        serializer = Create_User(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(serializer.validated_data['password'])
            user.save()
            return JsonResponse(data={'message': 'All right'}, status=200)
        return JsonResponse(data={'message': 'Not Register'}, status=400)


class login_user(APIView):
    def post(self, request):
        log_data = LoginUser(data=request.data)
        if log_data.is_valid():
            user = UserModel.objects.filter(email=log_data.validated_data['email']).first()
            if user is not None:
                if user.check_password(log_data.validated_data['password']):
                    login(request, user)
                    return JsonResponse(data={'message': 'All right'}, status=200)
            return JsonResponse(data={'message': 'This User is not on our database'})
        return JsonResponse(data={'message': 'Not Valid'}, status=400)


@method_decorator(login_required(), name='dispatch')  # проверка на авторизованность (починить путь)
class logout_user(APIView):

    def post(self, request):
        logout(request)
        return JsonResponse(data={'message': 'The User was logout'}, status=200)


@ensure_csrf_cookie
def get_csrf(request):
    cookies = request.COOKIES
    csrf_token = cookies.get("csrftoken", get_token(request))
    return JsonResponse(data={'csrfToken': csrf_token})



class create_tasks(APIView):
    def post(self, request):
        print(request.user.name)
