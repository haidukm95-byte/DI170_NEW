#Exercise 1: Cats
#Use the provided Cat class to create three cat objects. Then, create a function to find the oldest cat and print its details.

class Cat:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        print(f'A cat\'s name is {name} and it\'s {age} years old')

    def find_oldest_cat(cat1, cat2, cat3):
        cats = [cat1, cat2, cat3]
        oldest = max(cats, key=lambda cat: cat.age)
        return oldest


cat1 = Cat('Messy', 4)
cat2 = Cat('Flower', 3)
cat3 = Cat('Mommy', 6)

oldest_cat = Cat.find_oldest_cat(cat1, cat2, cat3)
print(f'The oldest cat is {oldest_cat.name}, and is {oldest_cat.age} years old')


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



#Exercise 3 : Who’s the song producer?
#Goal: Create a Song class to represent song lyrics and print them.

class Song:
    def __init__(self, lyrics):
        self.lyrics=lyrics
        lyrics=[]
    def sing_me_a_song(self):
        self.lyrics=', '.join(self.lyrics)
        print(self.lyrics)

stairway=Song(['There`s a lady who`s sure', 'all that glitters is gold', 'and she`s buying a stairway to heaven'])
stairway.sing_me_a_song()
    

#  Exercise 4 : Afternoon at the Zoo
# Goal: Create a Zoo class to manage animals. The class should allow adding animals, displaying them, selling them, and organizing them into alphabetical groups.

class Zoo:
    def __init__(self, zoo_name):
        self.zoo_name=zoo_name
        self.items=[]

    def add_animal(self, new_animal):
        self.items.append(new_animal)

    def get_animals(self):
        # displaying the animals
        print(self.items)

    def sell_animal(self, animal_sold):
        try:
            self.items.remove(animal_sold)
            print(f'{animal_sold} has been sold. Remaining animals: {self.items}')
        except ValueError:
            print(f'Error: {animal_sold} is not found in the list.')
    
    
    def sort_animals(self):
        from collections import defaultdict
        grouped_data = defaultdict(list)
        for item in self.items:
            if item and item[0].isupper():
                key = item[0]
                grouped_data[key].append(item)
        self.animals_by_letter = dict(sorted(grouped_data.items()))
        return self.animals_by_letter

    def get_groups(self):
        if hasattr(self, 'animals_by_letter'):
            print(self.animals_by_letter)
        else:
            print("No groups yet. Call sort_animals() first.")

brooklyn_safari=Zoo('Brooklyn Safari')
brooklyn_safari.add_animal("Giraffe")
brooklyn_safari.add_animal("Bear")
brooklyn_safari.add_animal("Baboon")
brooklyn_safari.add_animal('Elephant')
brooklyn_safari.add_animal('Lion')
brooklyn_safari.add_animal('Tiger')
brooklyn_safari.add_animal('Grizzly')
brooklyn_safari.get_animals()
brooklyn_safari.sell_animal("Bear")
brooklyn_safari.get_animals()
brooklyn_safari.sort_animals()
brooklyn_safari.get_groups()
        






    
    
    

        