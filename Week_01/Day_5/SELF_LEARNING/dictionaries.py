#Dictionary is a data type, but also
# a data structure
# It1s the way for us to organize data

# A dictionary is unordered value key pair
dictionary = {
    'a':[1,2,3],
    'b':'hello',
    'x':True
}
print(dictionary['a'][1])
print(dictionary['b'])
print(dictionary)

my_list = [
    {
        'a':[1,2,3],
    'b':'hello',
    'x':True
    },
    {
        'a':[4,5,6],
    'b':'hello',
    'x':True
    }
]
print('''
      In short, my_list contains of two dictionaries.
      Now printing list and dictionary 
      values according to the path, where:
      [0] or [1] are dictionaries numbers
      [a],[b] or [x] are group elements
      [1][2] or [3] are numbers of 'a'`s elements as a list:''')

print(my_list[0]['a'][1])
print(dictionary['a'][1])

#How to get a value multiplied per 2:
my_dict={num:num*2 for num in [1,2,3]}
#Where num is a key and num*2 is a value
#Like: number is number*2 for numbers in the list [1,2,3]

print(my_dict)