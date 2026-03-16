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
            
