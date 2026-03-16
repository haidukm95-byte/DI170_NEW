#Analyse the code below. What will be the outputs ?

#Explain the goal of the methods

class Circle:
    color = "red"

    def __init__(self, diameter):
        self.diameter = diameter

    def grow(self, factor=2):
        self.diameter = self.diameter * factor

    def get_color(self):
       return Circle.color

circle1 = Circle(2)
circle2 = Circle(5)
circle1.color='Blue'
print(circle1.color)
#print(circle1.color)
#print(Circle.color)
#print(circle1.get_color())
#circle1.grow(3)
#circle2.grow(3)
#print(circle1.diameter)
#print(circle2.diameter)

