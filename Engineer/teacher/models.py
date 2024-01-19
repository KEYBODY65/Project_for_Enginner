from django.contrib.auth.models import AbstractBaseUser
from django.db import models


class User_model(AbstractBaseUser):
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    USERNAME_FIELD = 'email'

