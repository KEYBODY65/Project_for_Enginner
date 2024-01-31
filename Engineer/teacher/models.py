from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, name, surname, password=None,):
        if not email:
            return ValueError('Not Email')

        user = self.model(email=self.normalize_email(email))
        user.name = name
        user.surname = surname
        user.set_password(password)
        user.save(using=self._db)
        return user

class UserModel(AbstractBaseUser):
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)


    objects = UserManager()
    USERNAME_FIELD = 'email'


