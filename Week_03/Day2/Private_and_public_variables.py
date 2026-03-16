#Private variables really don`t give any privacy or protection from editing, because there is no 
# full privacy in Python. 
# For example: name is a public variable, _name is a private one.
# Private variables just notify other programmers in the team not to change it and not to touch it 
# at all, to remain it the same.

class PlayerCharacter:
    def __init__(self, name, age):
        self._name=name
        self._age=age

    def run(self):
        print('run')

    def speak(self):
        print(f"My name is {self._name} and I am {self._age} years old")

player1=PlayerCharacter('Marko', 30)
player1.name='!!!'
player1.speak='BOOOOOOOO'

print(player1.speak)


