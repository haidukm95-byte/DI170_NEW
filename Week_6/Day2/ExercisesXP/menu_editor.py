import psycopg2
from Week_6.Day2.ExercisesXP.menu_item import MenuItem
from Week_6.Day2.ExercisesXP.menu_manager import MenuManager

HOSTNAME = 'localhost'
USERNAME = 'postgres'
PASSWORD = 'Psqlm2883'
DATABASE = 'W6D2ExercisesXP'

connection = psycopg2.connect(host=HOSTNAME, user=USERNAME, password=PASSWORD, dbname=DATABASE)
cursor = connection.cursor()

def show_user_menu():
    menu_grid='''
    View an Item (V)
    Add an Item (A)
    Delete an Item (D)
    Update an Item (U)
    Show the Menu (S)
    Quit (Q)
'''
    while True:
        print(menu_grid)
        n=input('What`s your selection? ')
        if n.strip().upper()=='V':
            name=input('Please enter name of an item you wish to view: ')
            view_item(name)
        elif n.strip().upper()=='A':
            name=input('Please enter name of an item you wish to add: ')
            price=int(input('Now enter it\'s price: '))
            add_item_to_menu(name, price)
        elif n.strip().upper()=='D':
            name=input('Please enter name of an item you wish to remove: ')
            remove_item_from_menu(name)
        elif n.strip().upper()=='U':
            old_name=input('Please enter name of an item you wish to update: ')
            new_name=input('Enter the new name: ')
            new_price=int(input('Now enter it\'s new price: '))
            update(old_name, new_name, new_price)
        elif n.strip().upper()=='S':
            select()
        elif n.strip().upper()=='Q':
            print('Goodbye!')
            break
        else:
            print('Wrong selection')
         
def view_item(name):
    result = MenuManager.get_by_name(name)
    if result:
        print(f"Item: {result[1]} - ${result[2]}")
    else:
        print(f"Item '{name}' not found.")

def add_item_to_menu(name, price):
    item = MenuItem(name, price)
    item.save()

def remove_item_from_menu(name):
    item = MenuItem(name, 0)
    item.delete()

def update(old_name, new_name, new_price):
    item = MenuItem(old_name, 0)
    item.update(new_name, new_price)

def select():
    results = MenuManager.all_items()
    if results:
        print("\n--- Menu Items ---")
        for item in results:
            print(f"  {item[1]} - ${item[2]}")
        print("------------------")
    else:
        print("No items in the menu.")

show_user_menu()




