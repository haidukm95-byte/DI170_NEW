numbers = range(4, 19)

for number in numbers:
  print(number)

#To print numbers from 1 to 5, use range(1,6)

#Although it can be iterated, the result of range is not a list.

#To store it in a list, you can convert the results of range() directly into a list using the list() function. When you wrap list() around a call to the range() function, the output will be a list of numbers.

numbers = list(range(1,6))
print(numbers)

for number in range(10, 21):
  print(number)

# how to skip numbers in a range:

for number in range(10, 21, 3):
  print(number)
#where 3 is outputting each third number
