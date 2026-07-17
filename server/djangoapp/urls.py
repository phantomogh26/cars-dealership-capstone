from django.urls import path
from . import views

app_name = 'djangoapp'

urlpatterns = [
    path('register', views.registration, name='register'),
    path('login', views.login_user, name='login'),
    path('logout', views.logout_request, name='logout'),
    path('about', views.about, name='about'),
    path('contact', views.contact, name='contact'),
]