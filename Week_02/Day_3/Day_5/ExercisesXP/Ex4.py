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
        



