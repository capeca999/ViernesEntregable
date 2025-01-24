from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        # Add your login logic here
        return JsonResponse({'message': 'Logged in successfully'})

@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        print(f"Received data: username={username}, email={email}, password={password}")
        # Add your registration logic here
        return JsonResponse({'message': 'Registered successfully'})

# Create your views here.
