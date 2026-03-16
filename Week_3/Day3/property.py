#@property
#1. Getter

#Methods used in Object-Oriented Programming (OOPS) which helps to access the private attributes from a class.

#Without @property

class MyClass:
  def __init__(self, first_name, last_name):
    self.first_name = first_name
    self.last_name = last_name

  def email(self): 
    return f"{self.first_name}.{self.last_name}@gmail.com"

newClass = MyClass("John", "Doe")
print(newClass.email())
# >> John.Doe@gmail.com

#With @property

class MyClass:
  def __init__(self, first_name, last_name):
    self.__first_name = first_name
    self.__last_name = last_name

  @property
  def email(self): 
    return f"{self.__first_name}.{self.__last_name}@gmail.com"

newClass = MyClass("John", "Doe")

print(newClass.email())
# >> TypeError: 'str' object is not callable

print(newClass.email)
# >> John.Doe@gmail.com

#2. Setter

#Methods used in Object-Oriented Programming feature 
# which helps to set the value to private attributes 
# in a class

class Person:

    used_names = set()

    def __init__(self, name, age):
        if name in self.used_names:
            name = input("That name is taken. Enter another name: ")

        self.name = name
        self.age = age
        self.used_names.add(name)

    @classmethod

    #USING @CLASSMETHOD WE TYPE ANY METOD INSTEAD OF SELF (HERE IT IS cls)
    def fromYear(cls, name, birth_year):
        THIS_YEAR = 2020
        return cls(name, THIS_YEAR - birth_year)

    @property
    def professional_name(self):
        return "Mr " + self.name