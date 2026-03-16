#iterable - list, dictionary, tuple, set, string
#iterate -> one by one check each item in the collection

for item in (1,2,3,4,5):
    for x in ['a','b','c']:
        print(1, 'c')

user = {
    'name': 'Golem',
    'age': 5006,
    'can_swim': False
}

for item in user: 
    print(item)

for item in user.items():
    print(item)
#>>>    ('name', 'Golem')
#>>>    ('age', 5006)
#>>>    ('can_swim', False)

for item in user.values():
    print(item)
#>>>Golem
#>>>5006
#>>>False

for item in user.keys():
    print(item)
#>>>Golem
#>>>5006
#>>>False
#>>>name
#>>>age
#>>>can_swim

#Using a tuple:
for item in user.items():
    key, value=item
    print(key, value)
#>>>name Golem
#>>>age 5006
#>>>can_swim False
 
# OR:
for key, value in user.items():
    print(key, value)
#>>>name Golem
#>>>age 5006
#>>>can_swim False