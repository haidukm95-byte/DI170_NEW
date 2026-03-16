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
    def check_arrows(self):
        print(f'{self.num_arrows} arrows remaining')
    def run(self):
        print('ran really fast')

wizard1=Wizard('Merlin', 50)
archer1=Archer('Robin', 100)
wizard1.sign_in()
archer1.sign_in()
wizard1.attack()


#The Wizard and Archer subclasses have inherited
#sign_in function from parent class User

class HybridBorg(Wizard, Archer):
    def __init__(self, name, power, num_arrows):
        Archer.__init__(self, name, num_arrows)

hb1=HybridBorg('Borgie', 50, 70)
print(hb1.attack())
