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
    
    def insert_10(countries_list):
        # Select 10 unique random countries
        random_countries = random.sample(countries_list, min(10, len(countries_list)))
        
        for random_country in random_countries:
            name = random_country['name']['common']
            capital = random_country.get('capital', ['N/A'])[0]
            flag = random_country['flag']
            subregion = random_country.get('subregion', 'N/A')
            population = random_country['population']
            
            query = """INSERT INTO Countries (name, capital, flag, subregion, population) VALUES (%s, %s, %s, %s, %s)"""
            cursor.execute(query, (name, capital, flag, subregion, population))
            print(f"The country {name} is added to the Countries database")
        
        connection.commit()  # Commit once after all inserts
    
    insert_10(countries)
    
else:
    print(f"Failed to retrieve data. Status code: {response.status_code}")

cursor.close()
connection.close()