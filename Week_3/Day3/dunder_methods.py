#DUNDER METHODS MEANS Double UNDERscore METHODS

#Fun fact: Due to the naming convention used for these methods, they are also called dunder methods which is a shorthand for double underscore methods. Sometimes they’re also referred to as special methods or magic methods. We prefer dunder methods, though!
#__init__,__str__ are some dunder methods.
#The magic about Dunder Methods is that the invocation is realized behind the scenes.
# When you create an instance x of class A with the statement

#x = A()

#Python will do the necessary calls to __new__ and __init__.

#1. The __init__ method
#You already noticed the weird syntax of the __init__ method; those four underscores surrounding the method’s name are here on purpose; in fact, they represent unique methods that python automatically calls when he needs them.
#For example, the __init__ function is the function that python automatically calls when it creates an object. 

#2. The __str__ function is the function that python calls when it needs to convert an object to a string, for example, when printing it.

#For example:

mylist = [1, 3, 5]
print(str(mylist))

#Is actually:

mylist = [1, 3, 5]
print(mylist.__str__())

#3. The __len__ method
#The __len__ method is here to return the length of the object. It’s the method that is called
#  when you try to reach len(my_object).

#4. The __call__ method

# One of the essential unique methods will be used when you try to call the object 
# (meaning adding () at the end of the name: my_object()).

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __call__(self):
        print (f"Person: {self.name}, Age: {self.age}")

person1 = Person("Sarah", 25)
person1()
# Person: Sarah, Age: 25


#5. __repr__ and __str__

#Most classes should at least have these unique methods:

 #   object.__str__:

# Called by the str() built-in function and by the print function to compute the informal string
#  representation of an object.
# __str__ will always be a string representation,


#    object.__repr__:

# Called by the repr() built-in function to compute the official string representation of an object.
# __repr__ can be a more “behind the scenes” look at the object. 

class Eden:
    def __init__(self, name, height):
        self.name=name
        self.height=height

    def __str__(self):
        return f'Hello! My name is {self.name}'
    
    def __len__(self):
        return len(self.name)
    
    def __call__(self):
        return f'{self.name} is {self.height} cm tall'
    
    def __repr__(self):
        return f'{self.name} is a cool person'
    

my_friend=Eden('Eden', 190)
print(str(my_friend))
print(my_friend.__str__())
print(my_friend.__len__())
print(my_friend.__call__())
print(my_friend.__repr__())