class Dog():
    dogs_king = "Bernie IV"
    number_of_dogs = 0

    # Initializer / Instance Attributes
    def __init__(self, name_of_the_dog):
        print("A new dog has been initialized !")
        print("His name is", name_of_the_dog)
        self.name = name_of_the_dog
        Dog.number_of_dogs += 1

    def bark(self):
        print(f"{self.name} barks ! WAF")

    def walk(self, number_of_meters):
        print(f"{self.name} walked {number_of_meters} meters")

    def rename(self, new_name):
        self.name = new_name

my_dog = Dog("Rex")
my_dog.rename("Paul")

print('The king of the dogs is: ', Dog.dogs_king)
print(my_dog.dogs_king)

my_other_dog=Dog('Skippy')
print(f"Curently, there are {Dog.number_of_dogs} dogs")