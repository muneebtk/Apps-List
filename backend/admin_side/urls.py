from django.urls import path
from . import views

urlpatterns=[
    path('admin_panel/get_category/',views.home),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('signup/',views.RegisterUser),
    path('admin_panel/submit_app/',views.submit_app),
    path('user/all_apps/',views.get_all_apps),
    path('home-page/<slug:slug>/',views.get_sigle_app),
    path('home-page/earn-points/<slug:slug>/',views.earn_points),
    path('home_page/points/',views.get_point),
    path('home_page/completed-tasks/',views.get_completed_tasks),
    path('home_page/profile/',views.get_profile),
]