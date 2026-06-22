from functools import reduce

def sum_numbers(first, second):
    return first+second

my_list = [1, 3, 5, 7]
reduced_list = reduce(sum_numbers, my_list)

print(reduced_list)
