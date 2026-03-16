import sql_connect as sqlc
from datetime import datetime

def select_all():
    if sqlc.cursor is None:
        print("Database not connected")
        return
    query = 'SELECT * FROM history'
    sqlc.cursor.execute(query)
    rows = sqlc.cursor.fetchall()
    for row in rows:
        print(row)

def delete_all():
    if sqlc.cursor is None:
        print("Database not connected")
        return
    query = 'DELETE FROM history'
    sqlc.cursor.execute(query)
    sqlc.connection.commit()

def insert_query(weather_data, wind_dir):
    if sqlc.cursor is None:
        print("Database not connected")
        return
    query = '''INSERT INTO history (location_id, city, country, date_of_query, temperature_C,
               min_temperature_C, max_temperature_C, humidity_percent, atm_pressure_mbar,
               wind_azimuth, wind_dir, wind_speed_m_s, cloudiness_rate, visibility_m)
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'''
    sqlc.cursor.execute(query, (
        weather_data['location_id'],
        weather_data['city_name'],
        weather_data['country_name_full'],
        datetime.now().date(),
        int(weather_data['temp']),
        int(weather_data['temp_min']),
        int(weather_data['temp_max']),
        weather_data['humidity'],
        weather_data['atm_pres'],
        weather_data['wind_azimuth'],
        wind_dir,
        int(weather_data['wind_speed']),
        weather_data['clouds'],
        weather_data['visibility']
    ))
    sqlc.connection.commit()


    
