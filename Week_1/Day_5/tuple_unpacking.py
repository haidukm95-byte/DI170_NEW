a_dict = {'color': 'blue', 'fruit': 'apple', 'pet': 'dog'}

print(a_dict.items())
# output : 
dict_items([('color', 'blue'), ('fruit', 'apple'), ('pet', 'dog')])

# The items() method returns a view object that displays 
# a list of dictionary's (key, value) tuple pairs.


for key, value in a_dict.items():
    print(key, '->', value)