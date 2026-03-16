#II . Overriding Parent Methods
#When you create the same method inside the child class, you override the parent class method.
#It’s important to note that child classes override or extend the functionality of parent classes. The child class will have all the parent class’s functions, plus his functions.

class Animal():
    def __init__(self, type, number_legs, sound):
        self.type = type
        self.number_legs = number_legs
        self.sound = sound

    def make_sound(self):
        print(f"I am an animal, and I love saying {self.sound}")

class Dog(Animal):
    def fetch_ball(self):
        print("I am a dog, and I love fetching balls")

    def make_sound(self):
        print("I am an DOGGG !!! WOUAFFF!!")

rex = Dog('dog', 4, "Wouaf")
rex.make_sound()