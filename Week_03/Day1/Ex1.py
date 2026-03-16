#Analyse the code below before executing it. What will be the outputs ?

class Circle():
    def __init__(self):
        self.color = "red"

class NewCircle(Circle):
    def __init__(self):
        self.color = "blue"

nc = NewCircle
print(nc.color)

# >> What will be the output ?
# >> the output gives us a child class` color 
# as it was stated in function to
# output exactly child`s class` color
