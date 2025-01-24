from django.contrib import admin
from django.urls import path, include
from users import views as user_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('tasks.urls')),
    path('', include('users.urls')),
    path('api/login/', user_views.login_view, name='login'),
    path('api/register/', user_views.register_view, name='register'),
]
