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


