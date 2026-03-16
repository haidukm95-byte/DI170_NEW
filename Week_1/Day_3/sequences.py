my_list = ['car', 16, 42, 'scissors', 'rock', 84]
print(my_list[0])
# the count starts from #0
#[0] "car"
#[1] 16
#[2] 42
# if I start from negative count, it prints it in reverse order
print(my_list[-1])
print(my_list[0:4])
print(my_list[2:5])
my_name = "Marko"
print(my_name[0:4])

my_hobbies = ["Eat", "Sleep", "Code"]
print(my_hobbies)

# how to change list`s strings:
# to modify an element
my_hobbies[1] = "Meditate"
print(my_hobbies)
# To add an element
my_hobbies.append("Boxing")
print(my_hobbies)

# To remove an eelement:
my_hobbies.remove("Eat")
print(my_hobbies)

fruits = ["apple","pear", "banana", "melon"]
print(len(fruits))

numbers = [3, 12, 1, -4]
print(sum(numbers))

numbers = [3, 5, 1, 2]
print(sorted(numbers))
letters = ['d', 'a', 'g', 'b']
print(sorted(letters))

food = ['spam', 'eggs', 'ham']
food.append('sushi')
print(food)
food.insert(0, 'beans')
print(food)
food.extend(['bread', 'water'])
print(food)

