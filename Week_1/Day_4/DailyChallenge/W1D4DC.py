print('Challenge 1')
number=int(input('Please type any number here '))
length=int(input('Now please type the list`s length: '))
list=[number]
multiplier=1
while len(list)<length:
    multiplier+=1
    list.append(number*multiplier)
print(list)

print('Challenge 2')
from itertools import groupby

def remove_consecutive_duplicates_groupby(s):
  """Removes all consecutive duplicate characters from a string using groupby."""
  # groupby returns key (character) and group of identical consecutive characters
  # We join only the key for each group
  return "".join(key for key, group in groupby(s))

# Example Usage:
input_string = input('Please input any string containing consecutive duplicated letters: ')
result = remove_consecutive_duplicates_groupby(input_string)
print(f"Original: {input_string}")
print(f"Result: {result}")