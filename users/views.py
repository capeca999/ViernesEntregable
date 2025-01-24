from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')
            # Add your login logic here
            response = JsonResponse({'message': 'Logged in successfully'})
            response['Access-Control-Allow-Methods'] = 'GET, POST, DELETE'
            return response
        except json.JSONDecodeError:
            return HttpResponseBadRequest('Invalid JSON')
    return HttpResponseBadRequest('Invalid request method')

@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')
            print(f"Received data: username={username}, email={email}, password={password}")
            # Add your registration logic here
            response = JsonResponse({'message': 'Registered successfully'})
            response['Access-Control-Allow-Methods'] = 'GET, POST, DELETE'
            return response
        except json.JSONDecodeError:
            return HttpResponseBadRequest('Invalid JSON')
    return HttpResponseBadRequest('Invalid request method')
