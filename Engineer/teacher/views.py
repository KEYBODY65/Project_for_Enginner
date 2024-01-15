from django.contrib.auth import login, logout, authenticate
from rest_framework.decorators import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse
from .serializers import Create_User, LoginUser


class create_user(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = Create_User(data=request.data)
        if serializer.is_valid():
            return JsonResponse(data={'form_data': serializer.data, 'message': 'All right'}, status=200)
        return JsonResponse(data={'message': 'Not Register'}, status=400)


class login_user(APIView):
    def post(self, request):
        log_data = LoginUser(data=request.data)
        if log_data.is_valid():
            user = authenticate(log_data.data)
            if user is not None:
                login(request, user)
                return JsonResponse(data={'message': 'All right'}, status=200)
            return JsonResponse(data={'message': 'No data'}, status=400)
        return JsonResponse(data={'message': 'No valid'}, status=400)


class logout_user(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return JsonResponse(data={'message': 'The User was logout'}, status=200)
