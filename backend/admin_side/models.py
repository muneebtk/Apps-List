from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class SubCategory(models.Model):
    name=models.CharField(max_length=200,null=True)
    def __str__(self):
        return self.name
class Category(models.Model):
    name=models.CharField(max_length=100,null=True)
    sub_category=models.ForeignKey(SubCategory,on_delete=models.CASCADE,null=True)
    def __str__(self):
        return self.name

class Apps(models.Model):
    app_name=models.CharField(max_length=100)
    slug=models.SlugField(max_length=100,null=True)
    app_link=models.CharField(max_length=500)
    category=models.ForeignKey(Category,on_delete=models.CASCADE,null=True)
    sub_category=models.ForeignKey(SubCategory,on_delete=models.CASCADE,null=True)
    points=models.IntegerField(null=True)



class MyAccountManager(BaseUserManager):
    def create_user(self,first_name,email,last_name,password=None):
        if not email:
            raise ValueError('User must have a email address')
        if not first_name:
            raise ValueError('User must have a first name')

        user=self.model(
        email=self.normalize_email(email),
        first_name=first_name,
        last_name=last_name,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,first_name,last_name,email,password):
        user=self.create_user(
        email=self.normalize_email(email),
        first_name=first_name,
        last_name=last_name,
        password=password,
        )
        user.is_active=True
        user.is_admin=True
        user.is_superadmin=True
        user.is_staff=True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser):
    first_name=models.CharField(max_length=200)
    last_name=models.CharField(max_length=200)
    email=models.EmailField(max_length=100,unique=True,null=False)
    date_joined=models.DateTimeField(auto_now_add=True)
    is_admin=models.BooleanField(default=False)
    is_staff=models.BooleanField(default=False)
    is_active=models.BooleanField(default=False)
    is_superadmin=models.BooleanField(default=False)

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['first_name','last_name']

    objects= MyAccountManager()

    def has_perm(self,perm,obj=None):
        return self.is_admin

    def has_module_perms(self,add_label):
        return True

class EarnedApps(models.Model):
    app=models.ForeignKey(Apps,on_delete=models.CASCADE)
    user=models.ForeignKey(Account,on_delete=models.CASCADE)
    image=models.ImageField()

