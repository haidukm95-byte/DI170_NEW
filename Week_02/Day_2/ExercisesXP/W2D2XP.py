print('Exercise 1: What are you learning?')
def display_message():
    print('I am learning functions in Python')
display_message()

print('\nExercise 2: What`s your favourite book?')
def favourite_book(sentence, title):
    print(sentence, title)
    #The function needs to output a message like “One of my favorite books is <title>”.
title=input('What`s your favourite book? ')
favourite_book("My favourite book is ", title)

print('\nExercise 3: Some Geography')
def describe_city(city, country='Unknown'):
    print(city,' is in', country)

describe_city("Jerusalem")
describe_city("Jerusalem",'Israel')

print('Exercise 4: Random')
import random

def compare_number(user_number):
  """
  Generates a random number between 1 and 100 and compares it to the given user number.

  Args:
    user_number: An integer between 1 and 100.
  """
  random_number = random.randint(1, 100)

  if user_number == random_number:
    print('Success!')
  else:
    print('Fail!')
    print('User Number:', user_number)
    print('Random Number:', random_number)

# Get input from the user and call the function
while True:
  try:
    user_input = int(input("Enter a number between 1 and 100: "))
    if 1 <= user_input <= 100:
      compare_number(user_input)
      break  # Exit the loop if the input is valid
    else:
      print("Please enter a number between 1 and 100.")
  except ValueError:
    print("Invalid input. Please enter a number.")

print('\nExercise 5: Let’s Create Some Personalized Shirts!')
def make_shirt(size='Large', text='I love Python'):
   print('The size of the shirt is ',size, 'and the text is ', text)
make_shirt()
make_shirt('Medium')
anysize=input('Select any size of shirt: ')
anymessage=input('What the message do you wish to leave here? ')
make_shirt(anysize, anymessage)

print('\nExercise 6: Magicians...')
magician_names=['Harry Houdini', 'David Blaine', 'Criss Angel']
def show_magicians(magicians):
   for magician in magicians:
      print(magician)
def make_great(magicians):
   for magician in magicians:
      mkgr='The Great'
      print(magician, mkgr)
show_magicians(magician_names)
make_great(magician_names)

print('\nExercise 7: Temperature Advice')
import random
temp=random.randint(-10, 40)
def get_random_temp(temp):
   print(temp)
def main(temp):
   get_random_temp(temp)
   print(f'The temperature is {temp} degrees Celsius.')
main(temp)
if temp < 0:
    print('Brrr, that`s freezing! Wear some extra layers today.')
elif 0<=temp<16:
    print('Quite chilly! Don`t forget your coat.') 
elif 16<=temp<23:
    print('Nice weather.')
elif 24<=temp<32:
    print('A bit warm, stay hydrated.')
else:
    print('It`s really hot! Stay cool.')


    



      


   




  





