#CLASS INHERITANCE
class Person:
    def __init__(self, name, birth_year):
        self.name=name
        self.birth_year=birth_year
    
    def age(self):
        return 2026-self.birth_year
    
    def intro(self):
        return f'Hello there! My name is {self.name}.'
    
joel=Person('Joel', 1992)
marko=Person('Marko' ,1995)

print(joel.intro)

