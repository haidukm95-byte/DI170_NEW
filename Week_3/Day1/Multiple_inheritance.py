#A class can inherit from two different classes; 
# in this case, the order of the parent class in a class definition will decide 
# what will be inherited. The first parent class will prioritize classes below 
# (meaning the functions last to be inherited can override functions from the parent class).

class Alien():
    def __init__(self, name, planet):
        self.name = name
        self.planet = planet

    def fly(self):
        print(self.name, 'is flying!')

    def sleep(self):
        print("Aliens don't sleep")

class Animal():
    def __init__(self, name):
        self.name = name

    def sleep(self):
        print("zzzZZZZZ")

class Dog(Animal):
    def bark(self):
        print(f"{self.name} barked, WAF !")

class AlienDog(Alien, Dog):
    def bark(self):
        print(f"{self.name} barked, 0ul10ul0u (that's how aliens dogs bark..) !")


my_normal_dog = Dog("Roger")
my_normal_dog.sleep()
# >> zzzZZZZZ

my_normal_dog.bark()
# >> Roger barked, WAF !

my_alien_dog = AlienDog("Rex", "Neptune")
print(my_alien_dog.planet)
# >> Neptune

my_alien_dog.fly()
# >> Rex is flying!

my_alien_dog.sleep()
# >> Aliens don't sleep

my_alien_dog.bark()
# >> Rex barked, 0ul10ul0u (that's how aliens dogs bark..) !