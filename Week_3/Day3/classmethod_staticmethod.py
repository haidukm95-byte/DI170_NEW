#def add_one(num):
 #   return num+1

#@add_one
#def double(num):
 #   return num * 2

#ans = double(5)
#print(ans)

#@staticmethod
#A static method is a method that doesn’t get self.
class MyClass:
  @staticmethod
  def add(a, b): 
    return a + b

print(MyClass.add(3, 6))

# The code belongs to a class but doesn’t use the object itself.
# It eases the readability of the code: when we use @staticmethod, we know that the method does not depend on the state of the object itself.
# It bounds a method to the class definition.

#Example:
class Man(Person):
    sex = "Male"

    @staticmethod
    def get_nicknames():
        return ["Bro", "Dude", "Buddy"]
    
#@classmethod

#Class methods are methods that are not bound to an object but to a class. 
# Its first argument is the class itself (remember that 
# classes are objects too).

class MyClass:
  __counter = 0

  @classmethod
  def add(cls,a): 
    return cls.__counter + a

my_class_add = MyClass.add(3)
print(my_class_add)
# >> 3

new_class = MyClass()
new_class.__counter = 1

print(new_class.add(3))
# >> 3

# The output is still three because the method add refers to the class definition, not the counter of the new_class instance



