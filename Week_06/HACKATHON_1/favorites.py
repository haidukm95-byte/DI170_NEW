import sql_connect as sqlc

def select_all():
    if sqlc.cursor is None:
        print("Database not connected")
        return []
    query = 'SELECT * FROM favorites'
    sqlc.cursor.execute(query)
    return sqlc.cursor.fetchall()  

def insert_query(weather_data):
    if sqlc.cursor is None:
        print("Database not connected")
        return
    query = '''INSERT INTO favorites (location_id, city, country)
               VALUES (%s, %s, %s)'''
    sqlc.cursor.execute(query, (
        weather_data['location_id'],
        weather_data['city_name'],
        weather_data['country_name_full'],    
    ))
    sqlc.connection.commit()
    
def delete_query(weather_data):
    if sqlc.cursor is None:
        print("Database not connected")
        return
    query = '''DELETE FROM favorites where location_id=%s'''
    sqlc.cursor.execute(query, (
        weather_data['location_id'],   
    ))
    sqlc.connection.commit()
    
def truncate():
    if sqlc.cursor is None:
        print("Database not connected")
        return
    query = '''TRUNCATE TABLE favorites'''
    sqlc.cursor.execute(query)
    sqlc.connection.commit()
    print('The favorites list has been cleared!')

    


