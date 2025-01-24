Este readme detallará el proceso de despliegue de la aplicación

Para el backend, debemos primero de todo importar la base de datos.

En este caso hemos utilizado postgreSQL



Para eso, tenemos el fichero dbexport.pqsql, el cual deberemos importar, os dejo un comando de como se deberia de hacer:

psql -U username dbname < dbexport.pgsql


Debemos de estar en la carpeta bin de postgre, un ejemplo de ruta seria: C:\Program Files\PostgreSQL\17\bin

Una vez la BDD importada, la arrancamos y esta parte finalizada.


[BACKEND]

Lo primero de todo debemos de instalar Python en nuestro equipo.

Una vez finalizado, debemos de iniciar manage.py, un comando de ejemplo seria instalar los requirements:

pip install -r /path/to/requirements.txt

y para finalizar, iniciamos el servidor:

python manage.py runserver


[FRONT]

# React + Vite

Para la utilización del front debemos de tener instalado:

React
Vite
PostgreSql

Y el backendIniciado para su correcta funcionalidad.


Hola! Este es el proceso de utilización del frontend

Nos tenemos que situar en la carpeta actual "taskmanagerfront" y abrir un powerShell:

con el powerShell iniciado, deberiamos iniciar: yarn run dev

Esto abrira el servidor en la ruta:

http://localhost:5173/