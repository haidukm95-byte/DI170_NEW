import sqlite3
from tabulate import tabulate

def order():
    choice = None
    while choice != "X":
        print("Moti's Fruit Shake Stand with questionable hygiene")
        inv = get_inv()
        print(tabulate(inv, headers=['Fruit', 'Amount']))
        choice = input("What do you want to add to your shake?")
        update_inv(choice)
    else:
        print("Bye")

def update_inv(choice):
    query = f"UPDATE fruit SET quantity=quantity-1 WHERE name = '{choice}';"
    return run_query(query)

def get_inv():
    query = "SELECT name, quantity FROM fruit ORDER BY name ASC;"
    return run_query(query)

def run_query(query):
    connection = sqlite3.connect("shakes.db")
    cursor = connection.cursor()
    cursor.execute(query)
    connection.commit()
    results = cursor.fetchall()
    connection.close()
    return results