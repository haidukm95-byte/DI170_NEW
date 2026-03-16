from faker import Faker
fake=Faker()
users_list=[]
address_list=[]
lang_code_list=[]

for i in range(10):
    users_list.append(fake.name())
    address_list.append(fake.address())
    lang_code_list.append(fake.language_code())

# Testing lists appending:
#print(users_list)
#print(address_list)
#print(lang_code_list)

users_dict_list = []
for i in range(len(users_list)):
    users_dict = {
        'name': users_list[i],
        'address': address_list[i],
        'language code': lang_code_list[i]
    }
    users_dict_list.append(users_dict)
    print(users_dict)

print(users_list)



    


