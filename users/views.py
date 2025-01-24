from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
import json
import psycopg2
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import load_config
from connect import connect

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            conn = connect()
            load_config()
            data = json.loads(request.body)
            print(f"Received data: username={data.get('username')}, email={data.get('email')}, password={data.get('password')}")
            sql = "SELECT * FROM users WHERE name = %s AND email = %s AND password = %s"
            with conn.cursor() as cursor:
                cursor.execute(sql, (data.get('username'), data.get('email'), data.get('password')))
                user = cursor.fetchone()
                print(f"Queried user: {user}")

            if user:
                response = JsonResponse({'message': 'Logged in successfully'})
            else:
                response = JsonResponse({'message': 'User does not exist'}, status=404)
            response['Access-Control-Allow-Methods'] = 'GET, POST, DELETE'
            return response
        except json.JSONDecodeError:
            return HttpResponseBadRequest('Invalid JSON')
        except Exception as e:
            return HttpResponseBadRequest(f'Error: {str(e)}')
    return HttpResponseBadRequest('Invalid request method')

@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        try:
            conn = connect()
            data = json.loads(request.body)

            print(f"Received data: username={data.get('username')}, email={data.get('email')}, password={data.get('password')}")
            sql = "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)"
            with conn.cursor() as cursor:
                cursor.execute(sql, (data.get('username'), data.get('email'), data.get('password')))
                conn.commit()

            response = JsonResponse({'message': 'Registered successfully'})
            response['Access-Control-Allow-Methods'] = 'GET, POST, DELETE'
            return response
        except json.JSONDecodeError:
            return HttpResponseBadRequest('Invalid JSON')
        except Exception as e:
            return HttpResponseBadRequest(f'Error: {str(e)}')
    return HttpResponseBadRequest('Invalid request method')
