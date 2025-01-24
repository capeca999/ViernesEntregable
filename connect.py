import psycopg2
from config import load_config

def connect():
    config = load_config()
    """ Connect to the PostgreSQL database server """
    try:
        # connecting to the PostgreSQL server
        with conn:
            print('Connected to the PostgreSQL server.')
            return conn
    except (psycopg2.DatabaseError, Exception) as error:
        print(error)

conn = psycopg2.connect(
    host="localhost",
    database="taskmanager",
    user="postgres",
    password="admin"
)

