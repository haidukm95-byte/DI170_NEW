print('''
\nExercise 7
Instructions

Write a function that counts an element in a list (without using the count method):
''')
list_test=['b','c','d','e','f','g','h']
print(list_test)
el_in=input('Please input a value from the list stated above: ')
if el_in in list_test:
    print(f'Element`s {el_in} position is {list_test.index(el_in)}')
else:
    print('The element is absent in the list. Please, try one more time')
