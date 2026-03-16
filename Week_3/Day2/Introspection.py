# Introspection is the way to determine object`s status

class User:
    def sign_in(self):
        print('logged in')

class Wizard(User):
    def __init__(self, name, power):
        self.name=name
        self.power=power
    def attack(self):
        print(f'attacking with power of {self.power}')
        

class Archer(User):
    def __init__(self, name, num_arrows):
        self.name=name
        self.num_arrows=num_arrows
    def attack(self):
        print(f'attacking with arrows: arrows left: {self.num_arrows}')

wizard1=Wizard('Merlin', 50)
archer1=Archer('Robin', 100)
wizard1.sign_in()
archer1.sign_in()
wizard1.attack()
archer1.attack()

#The Wizard and Archer subclasses have inherited
#sign_in function from parent class User


# Introspection example:
print(dir(wizard1))
#After ruuning this function it gives us all the methods and attributes that this instance has
#It gives all the methods that wizard1 has access to