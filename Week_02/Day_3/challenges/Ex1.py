print('''
Exercise 1
Instructions

Write a script that inserts an item at a defined index in a list.
''')
list1=['BMW', 'Audi', 'Skoda', 'Opel']
make=input('What car make do you prefer?')
index=int(input(f'Where will you position your make of choice in the list? (0 to {len(list1)})'))
if index>int(len(list1)):
    list1.append(make)
else:
    list1.insert(index, make)
print(list1)
