def get_formatted_name(first_name, last_name):
    """Return a full name, neatly formatted."""
    full_name = first_name + ' ' + last_name
    return full_name.title()

musician = get_formatted_name('jimi', 'hendrix') 
print(musician)

def divide_by_three(number):
  return number / 3

first_number = 12
first_number_computed = divide_by_three(first_number)
print(first_number_computed)
#>> 4.0

second_number = 27
second_number_computed = divide_by_three(second_number)
print(second_number_computed)
#>> 9.0