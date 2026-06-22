# Exercise 2
# Create a Dog class, 
# instantiate objects, 
# call methods, and compare 
# dog sizes.

class Dog:
    def __init__(self, name, height):
        self.name=name
        self.height=height
        print(f'The dog`s name is {name} and it`s height is {height} cm.')
    def bark(self):
        print(f'{self.name} goes woof!')
    def jump(self):
        print(f'{self.name} jumps {self.height * 2} cm high!')
    
davids_dog=Dog('Archie', 80)
sarahs_dog=Dog('Skippie', 75)

davids_dog.bark()
sarahs_dog.bark()

davids_dog.jump()
sarahs_dog.jump()

if davids_dog.height>sarahs_dog.height:
    print(f'{davids_dog.name} is {davids_dog.height-sarahs_dog.height} cm bigger than {sarahs_dog.name}.')
else:
    print(f'{sarahs_dog.name} is {sarahs_dog.height-davids_dog.height} cm bigger than {davids_dog.name}.')






