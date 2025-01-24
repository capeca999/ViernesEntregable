from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
import json
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from connect import connect

#Este fichero es el encargado de manejar las peticiones de los usuarios, en este caso del modelo TASKS
@csrf_exempt
def create_task_view(request):
    if request.method == 'POST':
        try:
            conn = connect()
            data = json.loads(request.body)
            print(f"Received data: title={data.get('title')}, description={data.get('description')}, complete={data.get('complete')}, user_id={data.get('user_id')}")

            sql = "INSERT INTO tasks (title, description) VALUES (%s, %s)"
            with conn.cursor() as cursor:
                cursor.execute(sql, (data.get('title'), data.get('description'), data.get('complete'), data.get('user_id')))
                conn.commit()

            response = JsonResponse({'message': 'Task created successfully'})
            response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
            return response
        except json.JSONDecodeError:
            return HttpResponseBadRequest('Invalid JSON')
        except Exception as e:
            return HttpResponseBadRequest(f'Error: {str(e)}')
    return HttpResponseBadRequest('Invalid request method')

@csrf_exempt
def read_task_view(request, task_id):
    if request.method == 'GET':
        try:
            conn = connect()
            sql = "SELECT * FROM tasks WHERE id = %s"
            with conn.cursor() as cursor:
                cursor.execute(sql, (task_id,))
                task = cursor.fetchone()
                print(f"Queried task: {task}")

            if task:
                response = JsonResponse({'task': task})
            else:
                response = JsonResponse({'message': 'Task not found'}, status=404)
            response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
            return response
        except Exception as e:
            return HttpResponseBadRequest(f'Error: {str(e)}')
    return HttpResponseBadRequest('Invalid request method')

@csrf_exempt
def update_task_view(request, task_id):
    if request.method == 'PUT':
        try:
            conn = connect()
            data = json.loads(request.body)
            print(f"Received data: title={data.get('title')}, description={data.get('description')}, complete={data.get('complete')}, user_id={data.get('user_id')}")

            sql = "UPDATE tasks SET title = %s, description = %s, complete = %s WHERE id = %s"
            with conn.cursor() as cursor:
                cursor.execute(sql, (data.get('title'), data.get('description'), data.get('complete'), task_id))
                conn.commit()

            response = JsonResponse({'message': 'Task updated successfully'})
            response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
            return response
        except json.JSONDecodeError:
            return HttpResponseBadRequest('Invalid JSON')
        except Exception as e:
            return HttpResponseBadRequest(f'Error: {str(e)}')
    return HttpResponseBadRequest('Invalid request method')

@csrf_exempt
def delete_task_view(request, task_id):
    if request.method == 'DELETE':
        try:
            conn = connect()
            sql = "DELETE FROM tasks WHERE id = %s"
            with conn.cursor() as cursor:
                cursor.execute(sql, (task_id,))
                conn.commit()

            response = JsonResponse({'message': 'Task deleted successfully'})
            response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
            return response
        except Exception as e:
            return HttpResponseBadRequest(f'Error: {str(e)}')
    return HttpResponseBadRequest('Invalid request method')
