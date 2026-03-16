import psycopg2

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
'''
    print(menu_grid)
    n=input('What`s your selection? ')
    print(n)
    if n.strip().upper()=='V':
        name=input('Please enter name of an item you wish to select: ')
        view_item()
    elif n.strip().upper()=='A':
        name=input('Please enter name of an item you wish to add: ')
        price=int(input('Now enter it\'s price: '))
        add_item_to_menu(name, price)
    elif n.strip().upper()=='D':
        name=input('Please enter name of an item you wish to remove: ')
        remove_item_from_menu(name)
    elif n.strip().upper()=='U':
        name=input('Please enter name of an item you wish to update: ')
        
    elif n.strip().upper()=='S':
         
    else:
         
         
def view_item(name):
    query_getbyname="SELECT * FROM Menu_Items WHERE item_name= %s"
    cursor.execute(query_getbyname, (name,))
    result = cursor.fetchone()
    return result

    
def add_item_to_menu(name, price):
    query='''
    INSERT INTO Menu_Items (item_name, item_price) VALUES (%s, %s)
'''
    cursor.execute(query(name, price))
    connection.commit()
    print(f"{name} - ${price}")
    print('Item was added successfully.')

def remove_item_from_menu(name):
    query = """DELETE FROM Menu_Items WHERE item_name = %s"""
    cursor.execute(query, (name,))
    connection.commit()
    if not cursor.execute:
        print('Error: the item does not exist in the list.')
    else: 
        print(f"Item was deleted successfully: {name}")

def update(new_name, new_price):
        query = """UPDATE Menu_Items SET item_name = %s, item_price = %s WHERE item_name = %s"""
        cursor.execute(query, (name, price))
        connection.commit()
        name = new_name
        price = new_price
        print(f"Updated to: {name} - ${price}")

show_user_menu()




