#break exit the while loop immediately without running any remaining code in the loop, regardless of the results of any conditional.

#For example, consider a program that asks the user about places they’ve visited.

#We can stop the while loop in this program by calling break as soon as the user enters the ‘quit’ value:

while True: 
    city = input("Please enter the name of a city you have visited (enter 'quit'  when you are finished): ")
    if city == 'quit':
        break
    else:
        print("I'd love to go to", city)

print("Goodbye !")

secret_number = 4

while True:
  user_number = input('Guess the secret number: ')
  if int(user_number) == secret_number:
    print('Congrats! You win!')
    break
  else:
    print('Wrong guess...')

