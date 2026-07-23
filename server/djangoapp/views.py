import json
import logging
import os

import requests
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

logger = logging.getLogger(__name__)

backend_url = os.environ.get('backend_url', 'http://localhost:3030')
sentiment_url = os.environ.get('sentiment_analyzer_url', 'http://localhost:5050/')


@csrf_exempt
def login_user(request):
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    user = authenticate(username=username, password=password)
    response = {"userName": username}
    if user is not None:
        login(request, user)
        response["status"] = "Authenticated"
    return JsonResponse(response)


def logout_request(request):
    logout(request)
    return JsonResponse({"userName": ""})


@csrf_exempt
def registration(request):
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    first_name = data['firstName']
    last_name = data['lastName']
    email = data['email']

    if User.objects.filter(username=username).exists():
        return JsonResponse({"userName": username, "error": "Already Registered"})

    user = User.objects.create_user(
        username=username, first_name=first_name,
        last_name=last_name, password=password, email=email,
    )
    login(request, user)
    return JsonResponse({"userName": username, "status": "Authenticated"})


def about(request):
    return render(request, 'About.html')


def contact(request):
    return render(request, 'Contact.html')


def get_dealerships(request, state="All"):
    if state == "All":
        endpoint = "/fetchDealers"
    else:
        endpoint = f"/fetchDealers/{state}"
    res = requests.get(backend_url + endpoint)
    return JsonResponse({"status": 200, "dealers": res.json()})


def get_dealer_by_id(request, dealer_id):
    res = requests.get(backend_url + f"/fetchDealer/{dealer_id}")
    return JsonResponse({"status": 200, "dealer": res.json()})


def get_dealer_reviews(request, dealer_id):
    res = requests.get(backend_url + f"/fetchReviews/dealer/{dealer_id}")
    reviews = res.json()
    for review_detail in reviews:
        try:
            response = requests.get(
                sentiment_url + f"analyze/{review_detail['review']}"
            )
            sentiment_result = response.json()
            review_detail['sentiment'] = sentiment_result.get('sentiment', 'neutral')
        except Exception as e:
            logger.error("Error analyzing sentiment: %s", e)
            review_detail['sentiment'] = 'neutral'
    return JsonResponse({"status": 200, "reviews": reviews})


@csrf_exempt
def add_review(request):
    if not request.user.is_anonymous:
        data = json.loads(request.body)
        try:
            response = requests.post(backend_url + "/insert_review", json=data)
            return JsonResponse({"status": 200, "review": response.json()})
        except Exception as e:
            return JsonResponse({"status": 401, "message": f"Error in posting review: {e}"})
    else:
        return JsonResponse({"status": 403, "message": "Unauthorized"})


def get_car_makes(request):
    res = requests.get(backend_url + "/fetchCarMakes")
    return JsonResponse({"status": 200, "car_makes": res.json()})


def get_car_models(request):
    res = requests.get(backend_url + "/fetchCarModels")
    return JsonResponse({"status": 200, "car_models": res.json()})
