print(list(range(1, 10, 2)))
print(list(range(0, 100, 7)))

for item in enumerate('abcd'):
    print(item)

for item in enumerate("marko"):
    print(item)

for (index_count, letter) in enumerate('abcd'):
    print('At index {} the letter is {}'.format(index_count, letter))

list1 = [1,2,3]
list2 = ['a','b','c']
list3 = [1.1, 2.2, 3.3, 4.4, 5.5]

for item in zip(list1, list2, list3): # only go as far it is possible
    print(item)

