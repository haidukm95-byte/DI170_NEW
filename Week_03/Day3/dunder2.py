#4. How to use the dunder methods?
#Example with __repr__()

class Person:
  def __init__(self, name, age):
      self.name = name
      self.age  = age

  def __repr__(self):
      return f"{self.__class__.__name__} : {self.name} {self.age}"

newPerson = Person('Sarah', 24)

print(newPerson)
# >> Person : Sarah 24 
# __repr__ is the representation of an object

#Example with __add__()

class Person:
  def __init__(self, name, lastName):
      self.name = name
      self.lastName = lastName

  def __repr__(self):
      return f"{self.__class__.__name__} : {self.name} {self.lastName}"

  def __add__(self, other):
      return Person(self.name, other.lastName)

father = Person('John', 'Snow')
mother = Person('Kaleesi', 'MotherOfDragons')
# using the __add__() method
dragonChild = father + mother 

print(dragonChild)
# >> Person : John MotherOfDragons // __add__ is called to add two objects

print(type(dragonChild))
# >> <class '__main__.Person'>

print(dir(dragonChild))


