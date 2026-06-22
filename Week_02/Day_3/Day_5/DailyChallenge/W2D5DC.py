class Farm:
    def __init__(self, farm_name):
        self.name=farm_name
        self.animals={}

    def add_animal(self, animal_type, count=1):
        if animal_type in self.animals:
            self.animals[animal_type] += count
        else:
            self.animals[animal_type] = count

    def getinfo(self):
        print(self.name)
        print(self.animals)

macdonald = Farm("McDonald")
macdonald.add_animal('cow', 5)
macdonald.add_animal('sheep')
macdonald.add_animal('sheep')
macdonald.add_animal('goat', 12)
macdonald.add_animal('cow')
print(macdonald.getinfo())



            
        




