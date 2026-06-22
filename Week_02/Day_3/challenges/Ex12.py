print('''
Exercise 12
Instructions

Write a function to check if a string is a palindrome:
''')
word_input=input('Type any word here. ')
word_input_reverse=word_input[::-1]
def is_palindrome(word_input):
    if word_input==word_input_reverse:
        print(f'The word {word_input} is a palyndrome.')
    else:
        print(f'The word {word_input} is not a palyndrome.')
is_palindrome(word_input)