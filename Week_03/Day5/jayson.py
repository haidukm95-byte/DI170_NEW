import json

my_family = {
    "parents":['Beth', 'Jerry'],
    "children":['Summer', 'Morty'],
    "dysfunctional": True
}

# Only Strings,Numbers, Booleans, Dictionaries, Lists, Tuples or None can be converted to JSON.

json_file=r'C:\M.HAIDUK\DOCUMENTS\STUDIES\DEV COURSE\DI_Bootcamp\Week_3\Day5\my_file.json'

with open(json_file, 'w') as file_obj:
     #This function opens it as a single string
    # json.dump(my_family, file_obj)
    # This function makes multiple lines:
    json.dump(my_family, file_obj, indent = 2, sort_keys=True)
# Retrieve JSON data
# Retrieving JSON data is done by the opposite function: json.load(source_file). It only accepts a JSON file in argument:

with open(json_file, 'r') as file_obj:
    my_family = json.load(file_obj)

print(my_family)

print(type(my_family))
