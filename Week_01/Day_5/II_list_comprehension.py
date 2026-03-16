# A. The Basic Way of Appending An element into a list
my_number = '1234'
my_list = []

for num in my_number:
    my_list.append(num)
print(my_list)

#B. The list comprehension way
my_number = '1234'
my_list = []

my_list = [int(num)**2 for num in my_number]
print(my_list)

#Examples with the range method
my_list = [x for x in range(0,6)]
print(my_list)

[0, 1, 2, 3, 4, 5]

my_list = [x**2 for x in range(0,6)] # square
print(my_list)

[0, 1, 4, 9, 16, 25]

my_list = [x for x in range(0,11) if x%2 == 0] # only even
print(my_list)

#
#C. The basic way of appending an element into a list with Nested Loop

my_list = []

for i in [2, 3, 4]:
    for j in [100, 200, 300]:
        my_list.append(i*j)

print(my_list)
#All the values were multiplied one to each other

#D. The list comprehension way
my_list = []
my_list = [(i*j) for i in [2, 3, 4] for j in [100, 200, 300]]
print(my_list)

#E. Dictionary comprehension
family_age = {'Lea': 12, 'Mark': 25, 'George': 50}

new_year = 1

new_family_age = {name: age+new_year for (name, age) in family_age.items()}

print(new_family_age)
