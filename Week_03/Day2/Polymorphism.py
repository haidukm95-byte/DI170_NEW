#The code below is not final and needs debugging!
class User:
    def sign_in(self):
        print('logged in')
#Way 3 (Way 1  and Way 2 are stated below)
    def attack(self):
        print('do nothing')

class Wizard(User):
    def __init__(self, name, power):
    def attack(self):
        User.attack(self)
        print(f'attacking with power of {self.power}')
        

class Archer(User):
    def __init__(self, name, num_arrows):
    def attack(self):
        User.attack(self)
        print(f'attacking with arrows: arrows left: {self.num_arrows}')

wizard1=Wizard('Merlin', 50)
archer1=Archer('Robin', 100)

# Way 1:
#def player_attack(char):
 #   char.attack()

#player_attack(wizard1)
#player_attack(archer1)

# Way 2:
#for char in [wizard1, archer1]:
 #   char.attack()

 #the Way2 code needs debugging!