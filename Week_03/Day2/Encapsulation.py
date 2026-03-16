# Encapsulation is the binding of data and functions that manipulate the data and 
# we encapsulate into one big object so that we keep everything in this box that users or code or other
# machines can interact with in this data and functions are what we call attributes and methods right.

class PlayerCharacter:
    def __init__(self, name, age):
        self.name=name
        self.age=age
    
player1=PlayerCharacter('andrei', 100)
print(player1.name)
print(player1.age)

player2={'name': 'andrei', 'age': 82}
print(player2['name'])
print(player2['age'])

