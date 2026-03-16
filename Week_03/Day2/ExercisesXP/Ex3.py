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
