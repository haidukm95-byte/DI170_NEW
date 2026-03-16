#Create a Class Method called get_by_name that will return a single item from the Menu_Items table depending on it’s name, if an object is not found (there is no item matching the name in the get_by_name method) return None.
import Week_6.Day2.ExercisesXP.menu_item as menu_item
class MenuManager:
    @classmethod
    def get_by_name(cls, name):
        query_getbyname="SELECT * FROM Menu_Items WHERE item_name= %s"
        menu_item.cursor.execute(query_getbyname, (name,))
        result = menu_item.cursor.fetchone()
        return result
    #Create a Class Method called all_items which will return a list of 
# all the items from the Menu_Items table.
    @classmethod
    def all_items(cls):
        query_getall="SELECT * FROM Menu_Items"
        menu_item.cursor.execute(query_getall)
        result = menu_item.cursor.fetchall()
        return result

# The test code is below, it was used to check the performance. Now it is disabled for performing the
# control from menu_editor.py

#result = MenuManager.get_by_name('Pizza')
#print(result)
#all=MenuManager.all_items()
#print(all)



