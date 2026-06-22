print('''
Exercise 10
Instructions

Write a function that prints the longest word in a list.
''')
mystr = input('Please input here your string: ')
mystr_list = mystr.split()
print(mystr_list)
longest_word=max(mystr_list, key=len)
print(longest_word)