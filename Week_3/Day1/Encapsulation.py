#We can restrict access to methods and variables. This prevents data from direct modification, which is called encapsulation. In Python, we denote private attributes using underscore as prefix i.e., single _ or double __.

#Lets define an object class Computer and try to access its variables and methods both private and global. 

class Computer():

    def __init__(self):
        self.name = "Apple Computer" # public
        self.__max_price = 900 # private

    def sell(self):            # public method
        print(f"Selling Price: {self.__max_price}")

    def __sell(self):          # private method
      print('This is private method')

    def set_max_price(self, price):
        self.__max_price = price

c = Computer()

#Note: So once we try to access attributes and methods of our class - we should receive a restriction if they are private.


c.sell()
# >> Selling Price: 900


#Explanation of the output Selling Price: 900:
#the__max_price which is a private attribute, is displayed by using the public sell() method.


c.__sell()
# >> AttributeError: 'Computer' object has no attribute '__sell'


#Explanation of the output AttributeError: 'Computer' object has no attribute '__sell':
#The interpreter cannot perform the __sell() function because of the __ underscore meaning it’s private and can’t be accessed by the user.


# change the price
c.__max_price = 1000
c.sell()
# >> The private attribute __max_price cannot be changed
# >> Selling Price: 900

# using setter function
c.set_max_price(1000)
c.sell()
# >> Selling Price: 1000
