#III. The super() Function

#With the super() function, you can gain access to inherited methods that have been overwritten in a class object.

class Animal():
    def __init__(self, type, number_legs, sound):
        self.type = type
        self.number_legs = number_legs
        self.sound = sound

class Dog(Animal):
    def __init__(self, type, number_legs, sound, fetch_ball):
        super().__init__(type, number_legs, sound)
        # Or : Animal.__init__(self,type, number_legs, sound)
        self.fetch_ball = fetch_ball

rex = Dog('dog', 4, "wouaf", True)
print('This animal is a:', rex.type)
# >> This animal is a dog

print('This dog has', rex.number_legs , ' legs')
# >> This dog has 4 legs

print('This dog makes the sound ', rex.sound)
# >> This dog makes the sound wouaf

print('Does this dog fetchs balls ? ', rex.fetch_ball)
# >> Does this dog fetchs balls ? True


#We use super() function before __init__() method. We want to pull the content of __init__() method from the parent class into the child class.
#You can also specify from which class you want to use the super() function.

class MyClass(object):
    def func(self):
        print("I'm being called from the Parent class")


class ChildClass(MyClass):
    def func(self):
        print("I'm actually being called from the Child class")
        print("But...")
        # Calling the `func()` method from the Parent class.
        super(ChildClass, self).func()

my_instance_2 = ChildClass()
my_instance_2.func()

