# class name has to be always
# in singular and starting from
# capital letter!
class PlayerCharacter:
    def __init__(self, name, age):
        self.name=name
        self.age=age

    def run(self):
        print('run')

player1=PlayerCharacter('Cindy', 44)
player2=PlayerCharacter('Tom', 21)

print(player1.age)
print(player2.age)

