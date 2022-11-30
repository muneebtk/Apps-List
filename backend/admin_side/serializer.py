from rest_framework import serializers
from . models import Apps,Category,SubCategory,EarnedApps, Account


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=SubCategory
        fields=['name']

class CategorySerializer(serializers.ModelSerializer):
    sub_category=SubCategorySerializer()
    class Meta:
        model=Category
        fields=['name','sub_category']

class AppSerializer(serializers.ModelSerializer):
    category=CategorySerializer()
    sub_category=SubCategorySerializer()
    class Meta:
        model=Apps
        fields=['app_name','slug','app_link','category','sub_category','points']
class EarnedAppsSerializer(serializers.ModelSerializer):
    app=serializers.SerializerMethodField(source='get_app')
    user=serializers.SerializerMethodField(source='get_user')
    point=serializers.SerializerMethodField(source='get_point')
    class Meta:
        model=EarnedApps
        fields=['app','user','point']
    def get_app(self,obj):
        return obj.app.app_name
    def get_user(self,obj):
        return obj.user.first_name
    def get_point(self,obj):
        return obj.app.points

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model=Account
        fields=['first_name','last_name','email']
        
