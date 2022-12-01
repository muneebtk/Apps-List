from ipaddress import summarize_address_range
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from . models import SubCategory,Apps,Category, Account
from . serializer import AppSerializer,CategorySerializer, SubCategorySerializer, EarnedAppsSerializer, AccountSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status

from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404
from django.template.defaultfilters import slugify
from . models import EarnedApps
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum


# add data to a jwt token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
     @classmethod
     def get_token(cls, user):
        token = super().get_token(user)
        token['is_super_admin'] = user.is_superadmin
        token['name'] = user.first_name
        return token
        

class MyTokenObtainPairView(TokenObtainPairView):
    print('scene')
    serializer_class = MyTokenObtainPairSerializer

# Signup a user
@api_view(['POST'])
def RegisterUser(request):
    data=request.data
    password=data['password']
    confirm_password=data['confirm_password']
    if password!=confirm_password:
        return Response('Password does not matching.',status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
    user = Account.objects.create(first_name=data['first_name'],
    last_name=data['last_name'],
    email=data['email'],
    password=make_password(data['password']),
    is_active=True,
    )
    user.save()
    return Response('User registerd successfully')
   
# admin home page details
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def home(request):
    category=Category.objects.all()
    cat_serializer=CategorySerializer(category,many=True)
    sub_category=SubCategory.objects.all()
    sub_serializer=SubCategorySerializer(sub_category,many=True)
    context={
        'cat_serializer':cat_serializer.data,
        'sub_cat_serializer':sub_serializer.data,
    }
    return Response(context)

# submit a new app
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def submit_app(request):
    data=request.data
    print(data,'data')
    app_name=data.get('app_name')
    app_link=data.get('app_link')
    category=data.get('category')
    sub_category=data.get('sub_category')
    points=data.get('points')
    cat=Category.objects.get(name=category)
    sub_cat=get_object_or_404(SubCategory,name=sub_category)
    if Apps.objects.filter(slug=slugify(app_name)).exists():
        return Response('App already exists')
    Apps.objects.create(
        app_name=app_name,
        slug=slugify(app_name),
        app_link=app_link,
        category=cat,
        sub_category=sub_cat,
        points=points
    )
    return Response('App added successfully.')

# get all apps

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_all_apps(request):
    apps=Apps.objects.all()
    serializer=AppSerializer(apps,many=True)
    return Response(serializer.data)

# get single app 

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_sigle_app(request,slug):
    single_app=Apps.objects.get(slug=slug)
    serializer=AppSerializer(single_app,many=False)
    return Response(serializer.data)

# submit a app screenshot to earn point

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def earn_points(request,slug):
    user=request.user
    print(slug,'slug')
    app=Apps.objects.get(slug=slug)
    if EarnedApps.objects.filter(user=user,app=app).exists():
        return Response('You have already earn this.')
    EarnedApps.objects.create(
        user=user,
        app=app,
        image=request.FILES['image']
    )
    return Response('Points earned successfully.')

# get points of a user
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_point(request):
    print(request.user,'user')
    total_points=EarnedApps.objects.filter(user=request.user).aggregate(Sum('app__points'))
    print(total_points)
    return Response({'sum':total_points})

# take the completed tasks
@api_view(['GET'])
def get_completed_tasks(request):
    completed_tasks=EarnedApps.objects.filter(user=request.user)
    serializer=EarnedAppsSerializer(completed_tasks,many=True)
    return Response(serializer.data)

# get profile data
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_profile(request):
    user=request.user
    user_data=Account.objects.get(email=user)
    serializer=AccountSerializer(user_data,many=False)
    return Response(serializer.data)