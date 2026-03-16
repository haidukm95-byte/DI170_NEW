# Exercise 1: Pets
class Pets:
    def __init__(self, animals):
        self.animals=animals
    def walk(self):
        for animal in self.animals:
            print(animal.walk())


class Cat(Pets):
    def __init__(self, name, age):
        self.name=name
        self.age=age
        print(f'Here is {self.name}, it is {self.age} years old')

    def walk(self):
        return f'{self.name} is just walking around'

class Siamese(Cat):
    def bride(self):
        print(f'{self.name}`s bride is Siamese')

    def sing(self, sounds='Meowww!'):
        print(f'{sounds}')
    
    def color(self, colour='coffee colored with black on legs and face'):
        self.colour=colour
        print(f'is {self.colour}')

    def eyes(self, colour='blue'):
        self.colour=colour
        print(f'{self.name}`s eyes are {self.colour}-colored')

class Bengal(Cat):
    def bride(self):
        print(f'{self.name}`s bride is Siamese')

    def sing(self, sounds='Meeeaoww!'):
        print(f'{sounds}')
    
    def color(self, colour='leopard colored'):
        self.colour=colour
        print(f'is {self.colour}')

    def eyes(self, colour='green'):
        self.colour=colour
        print(f'{self.name}`s eyes are {self.colour}-colored') 

class Chartreaux(Cat):
    def bride(self):
        print(f'{self.name}`s bride is Siamese')

    def sing(self, sounds='Meaouw!'):
        print(f'{sounds}')
    
    def color(self, colour='dark grey to blue colored'):
        self.colour=colour
        print(f'is {self.colour}')

    def eyes(self, colour='yellow'):
        self.colour=colour
        print(f'{self.name}`s eyes are {self.colour}-colored')


marv=Siamese('Marv', 4)
marv.bride()
marv.eyes()
marv.sing()
messy=Bengal('Messy', 3)
messy.bride()
messy.eyes()
messy.sing()
monsieur=Chartreaux('Monsieur Chateaux', 5)
monsieur.bride()
monsieur.eyes()
monsieur.sing()

all_cats=[marv, messy, monsieur]
sara_pets=Pets(all_cats)
sara_pets.walk()

#Exercise 2: Dogs
class Dog:
    def __init__(self, name, age, weight):
        self.name=name
        self.age=age
        self.weight=weight
        print(f'Here is {self.name}, it`s {self.age} years old and weighs {self.weight} kilos')

    def bark(self):
        print(f'{self.name} is barking')

    def run_speed(self):
        return self.weight / self.age * 10

    def fight(self, other_dog):
        self_power = self.weight / self.age * 10 * self.weight
        other_power = other_dog.weight / other_dog.age * 10 * other_dog.weight

        if self_power > other_power:
            print(f'{self.name} beat {other_dog.name}')
        else:
            print(f'{other_dog.name} beat {self.name}')

baxter=Dog('Baxter', 5, 50)
zeus=Dog('Zeus', 6, 45)
baxter.bark()
print(baxter.run_speed())
zeus.bark()
print(zeus.run_speed())
Dog.fight(baxter, zeus)
            
#Exercise 3: Dogs Domesticated
import random
class Dog:
    def __init__(self, name, age, weight):
        self.name=name
        self.age=age
        self.weight=weight
        print(f'Here is {self.name}, it`s {self.age} years old and weighs {self.weight} kilos')

    def bark(self):
        print(f'{self.name} is barking')

    def run_speed(self):
        return self.weight / self.age * 10

    def fight(self, other_dog):
        self_power = self.weight / self.age * 10 * self.weight
        other_power = other_dog.weight / other_dog.age * 10 * other_dog.weight

        if self_power > other_power:
            print(f'{self.name} beat {other_dog.name}')
        else:
            print(f'{other_dog.name} beat {self.name}')

class PetDog(Dog):
    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *args):
        print(f'{self.name} plays and skips around')

    def do_a_trick(self):
        if self.trained:
            tricks = ["does a barrel roll", "stands on his back legs", "shakes your hand", "plays dead"]
            print(f"{self.name} {random.choice(tricks)}")

my_dog = PetDog("Fido", 2, 10)
my_dog.train()
my_dog.play("Buddy", "Max")
my_dog.do_a_trick() 

#Exercise 4: Family and Person Classes
class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self.age = age
        self.last_name = ""

    def is_18(self):
        return self.age >= 18
        
class Family:
    def __init__(self, last_name):
        self.last_name = last_name
        self.members = []

    def born(self, first_name, age):
        new_person = Person(first_name, age)
        new_person.last_name = self.last_name
        self.members.append(new_person)

    def check_majority(self, first_name):
        for member in self.members:
            if member.first_name == first_name:
                if member.is_18():
                    print("You are over 18, your parents Jane and John accept that you will go out with your friends")
                else:
                    print("Sorry, you are not allowed to go out with your friends.")
                return

    def family_presentation(self):
        print(f"Family: {self.last_name}")
        for member in self.members:
            print(f"{member.first_name} - {member.age} years old")
        

# Test the implementation
sloan_family = Family("Sloan")
sloan_family.born("Eric", 21)
sloan_family.born("Kurt", 18)
sloan_family.born("Mike", 14)

sloan_family.family_presentation()
print()
sloan_family.check_majority("Kurt")
sloan_family.check_majority("Eric")
sloan_family.check_majority("Mike")




