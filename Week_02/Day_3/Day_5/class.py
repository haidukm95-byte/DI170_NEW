class Dog:
    # Initializer / Instance Attributes
    def __init__(self, name):
        print('A new dog has been initialized!')
        print(f'His name is {name}')
        self.name=name

    def bark(self):
        print(f'{self.name} barks! WAF!')

    def walk(self, number_of_meters):
        print(f"{self.name} walked {number_of_meters} meters")
    
my_dog=Dog('Peanut')
gabes_dog=Dog('Jacob')
my_dog.bark()
my_dog.walk(120)
#>>>Peanut barks! WAF!
#>>>Peanut walked 120 meters


print(my_dog.name)
print(gabes_dog.name)

class Person():
    def __init__(self, name, age):
        self.name=name
        self.age=age

first_person = Person('John', 36)
print(first_person.name)

my_str='hello world'
my_str.upper()

