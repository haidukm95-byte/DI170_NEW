import requests
import psycopg2
import random

HOSTNAME = 'localhost'
USERNAME = 'postgres'
PASSWORD = 'Psqlm2883'
DATABASE = 'Countries'

connection = psycopg2.connect(host=HOSTNAME, user=USERNAME, password=PASSWORD, dbname=DATABASE)
cursor = connection.cursor()

api_url = 'https://restcountries.com/v3.1/all?fields=name,capital,flag,subregion,population'

response = requests.get(api_url)
if response.ok:
    countries = response.json() 
    random_country=random.choice(countries)
    name = random_country['name']['common']  # name is nested!
    capital = random_country.get('capital', ['N/A'])[0]  # capital is a list
    flag = random_country['flag']
    subregion = random_country.get('subregion', 'N/A')
    population = random_country['population']
    #full_list=[name, capital, flag, subregion, population]
    #print(insert)

else: 
    print(f"Failed to retrieve data. Status code: {response.status_code}")

def insert(name, capital, flag, subregion, population):
    query = """INSERT INTO Countries (name, capital, flag, subregion, population) VALUES (%s, %s, %s, %s, %s)"""
    cursor.execute(query, (name, capital, flag, subregion, population))
    connection.commit()
    print(f"The country {name} is added to the Countries database")        
    
def insert_10():
    n=1
    while n<=10:
        random_country = random.choice(countries)
        name = random_country['name']['common']
        capital = random_country.get('capital', ['N/A'])[0]
        flag = random_country['flag']
        subregion = random_country.get('subregion', 'N/A')
        population = random_country['population']
    
        insert(name, capital, flag, subregion, population)
        n=n+1

insert_10()
cursor.close()
connection.close()


