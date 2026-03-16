active = True

while active: 
    city = input("Please enter the name of a city you have visited (enter 'quit' when you are finished): ")
    if city == 'quit':
        active = False
    elif city == 'leave me alone':
        active = False
    elif city == 'stop':
        active = False
    else:
        print("I'd love to go to", city)

print("Goodbye !")