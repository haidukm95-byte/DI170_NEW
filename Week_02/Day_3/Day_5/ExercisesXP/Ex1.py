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


    
    
    

        