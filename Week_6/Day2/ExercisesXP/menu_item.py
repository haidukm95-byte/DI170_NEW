#In the file menu_item.py, create a new class called MenuItem, the attributes should be the
# name and price of each item.
import psycopg2

HOSTNAME = 'localhost'
USERNAME = 'postgres'
PASSWORD = 'Psqlm2883'
DATABASE = 'W6D2ExercisesXP'

connection = psycopg2.connect(host=HOSTNAME, user=USERNAME, password=PASSWORD, dbname=DATABASE)
cursor = connection.cursor()

class MenuItem:
    def __init__(self, name, price):
        self.name = name
        self.price = price

#Create several methods (save, delete, update) these methods will allow a user to save,
# delete and update items from the Menu_Items table. The update method can update the name as well
# as the price of an item.

    def save(self):
        query = """INSERT INTO Menu_Items (item_name, item_price) VALUES (%s, %s)"""
        cursor.execute(query, (self.name, self.price))
        connection.commit()
        print(f"Saved: {self.name} - ${self.price}")

    def delete(self):
        query = """DELETE FROM Menu_Items WHERE item_name = %s"""
        cursor.execute(query, (self.name,))
        connection.commit()
        print(f"Deleted: {self.name}")

    def update(self, new_name, new_price):
        query = """UPDATE Menu_Items SET item_name = %s, item_price = %s WHERE item_name = %s"""
        cursor.execute(query, (new_name, new_price, self.name))
        connection.commit()
        self.name = new_name
        self.price = new_price
        print(f"Updated to: {self.name} - ${self.price}")


# The test code is below, it was used to check the performance. Now it is disabled for performing the
# control from menu_editor.py

#item = MenuItem('Burger', 35)
#item.save()
#item.delete()
#item.update('Veggie Burger', 40)

#pizza=MenuItem('Pizza', 25)
#bigmac=MenuItem('BigMac', 30)
#pizza.save()
#bigmac.save()