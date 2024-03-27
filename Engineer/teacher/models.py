from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, name, surname, password=None, ):
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


class Task(models.Model):
    task_builder = models.ForeignKey(UserModel, on_delete=models.PROTECT)
    task_name = models.CharField(max_length=255)
    task_description = models.TextField()
    weight = models.IntegerField()
    true_answer = models.CharField(max_length=255)
    file = models.FileField(blank=True, null=True, upload_to='task_files/')
    subject = models.CharField(max_length=255)


class Group(models.Model):
    group_builder = models.ForeignKey(UserModel, on_delete=models.PROTECT)
    group_name = models.CharField(max_length=255)


class Student(models.Model):
    student_teacher = models.ForeignKey(UserModel, on_delete=models.PROTECT)
    student_group = models.ManyToManyField(Group)
    student_name = models.CharField(max_length=255)
    student_surname = models.CharField(max_length=255)
    student_patronymic = models.CharField(max_length=255)
    student_login = models.CharField(max_length=255)
    student_password = models.CharField(max_length=255)


class Test(models.Model):
    test_builder = models.ForeignKey(UserModel, on_delete=models.PROTECT)
    name_of_test = models.CharField(max_length=255)
    task_ids = models.ManyToManyField(Task)
    group_test = models.ForeignKey(Group, on_delete=models.PROTECT, blank=True, null=True)


class Statistic(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    col_balls = models.IntegerField()
    time = models.TimeField(auto_now=True)
