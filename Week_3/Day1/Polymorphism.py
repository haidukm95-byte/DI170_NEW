# II. Polymorphism

# In programming, polymorphism means different or related classes that use the same names for 
# their functions.

# Polymorphism allows the ability to use a standard interface for multiple forms or data types.

# Let’s define two classes, Parrot and Penguin, both with functions called fly and swim and then 
# we’ll call these functions with the flying_test(bird) function.

class Parrot():

    def fly(self):
        print("Parrot can fly")

    def swim(self):
        print("Parrot can't swim")

class Penguin():

    def fly(self):
        print("Penguin can't fly")

    def swim(self):
        print("Penguin can swim")

# common interface
def flying_test(bird):
    bird.fly()

#instantiate objects
blu = Parrot()
peggy = Penguin()

# passing the object
flying_test(blu)
# >> Parrot can fly

flying_test(peggy)
# >> Penguin can't fly


# In the next section we learn that a child class (AlienDog) 
# inherits all the methods from the parent class (Dog). 
# However, in some situations, the method inherited from the parent class doesn’t quite fit 
# into the child class (because of different attributes and characteristics). In such cases, 
# you will have to re-implement the method in the child class.


