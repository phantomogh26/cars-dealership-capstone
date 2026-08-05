from django.urls import path
from . import views

app_name = 'djangoapp'

urlpatterns = [
    path('register', views.registration, name='register'),
    path('login', views.login_user, name='login'),
    path('logout', views.logout_request, name='logout'),
    path('about', views.about, name='about'),
    path('contact', views.contact, name='contact'),
    path('get_dealers', views.get_dealerships, name='get_dealers'),
    path('get_dealers/<str:state>', views.get_dealerships, name='get_dealers_by_state'),
    path('dealer/<str:dealer_id>', views.get_dealer_by_id, name='dealer_details'),
    path('reviews/dealer/<str:dealer_id>', views.get_dealer_reviews, name='dealer_reviews'),
    path('add_review', views.add_review, name='add_review'),
    path('get_cars', views.get_cars, name='get_cars'),
    path('get_car_models', views.get_car_models, name='get_car_models'),
]
