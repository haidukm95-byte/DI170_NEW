#keys = ['Ten', 'Twenty', 'Thirty']
#values = [10, 20, 30]

print('Exercise 1: Converting Lists into Dictionaries')
keys=['Ten', 'Twenty', 'Thirty']
values=[10, 20, 30]
dict1=dict(zip(keys, values))
print(dict1)

print('Exercise 2: Cinemax #2')
price=0
family = {
    "Rick": 43, 
    'Beth': 13, 
    'Morty': 5, 
    'Summer': 8
    }

# Under 3 years old: Free
# 3 to 12 years old: $10
# Over 12 years old: $15
print('The members of the family:')
for key, value in family.items():
    print(key, value)
print('''
      Cinemax tickets pricing:
      below age 0f 3: free
      from age of 3 to 12: $10
      above: $15
      ''')
for key, value in family.items():
    if value < 3:
        price += 0
        continue
    if 3 < value < 12:
        price += 10
        continue
    if value > 12:
        price += 15
        continue
print(f"Total price is ${price}")

print('Exercise 3: Zara')
brand={
    'name': 'Zara',
    'creation_date': 1975,
    'creator_name': 'Amancio Ortega Gaona',
    'type_of_clothes': ['men', 'women', 'children', 'home'],
    'international_competitors': ['Gap', 'H&M', 'Benetton'],
    'number_stores': 7000,
    'major_color_france': 'blue',
    'major_color_spain': 'red', 
    'major_color_us': ['pink', 'green']
    }
brand['number_stores']=2
print(f'The number of Zara stores is {brand['number_stores']}.')

clients=brand['type_of_clothes']
print(clients[0],',',clients[1],',',clients[2], "are the Zara`s clients.")

brand['country_creation']='Spain'
print(brand['country_creation'])

if bool(brand['international_competitors']) == True:
    upd=brand['international_competitors'].append('Desigual')
print(brand['international_competitors'])

del brand['creation_date']

print(brand['international_competitors'][-1])

print(brand['major_color_us'])

print(f'Total number of keys in the dictionary is {len(brand)}.')

print(list(brand.keys()))

more_on_zara={
    'creation_date': 1975,  
    'number_stores': 7000
}
print(brand | more_on_zara)

print('Exercise 4: Disney Characters')
users = ["Mickey", "Minnie", "Donald", "Ariel", "Pluto"]
user_age = [0, 1, 2, 3, 4]
#dict1 already exists!
dict2=dict(zip(users, user_age))
dict3=dict(zip(user_age, users))
dict4=sorted(dict2.items())
print(dict2)
print(dict3)
print(dict4)
