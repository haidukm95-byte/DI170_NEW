import psycopg2

HOSTNAME = 'localhost'
USERNAME = 'postgres'
PASSWORD = 'Psqlm2883'
DATABASE = 'Weather_tracker'

connection = None
cursor = None

try:
    connection = psycopg2.connect(host=HOSTNAME, user=USERNAME, password=PASSWORD, dbname=DATABASE)
    cursor = connection.cursor()
except psycopg2.Error as e:
    print(f"Database connection error: {e}")