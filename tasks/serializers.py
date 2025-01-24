from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'complete')

        def validate(self, data):
            # Agrega tus validaciones personalizadas aquí
            if 'title' in data and (len(data['title']) < 5 or len(data['title']) > 50):
                raise serializers.ValidationError("El título debe tener al menos 5 caracteres y como maximo 50.")
            return data
        


        