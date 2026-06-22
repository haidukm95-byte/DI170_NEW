#Python has a special syntax, 
# * (unpacking operator) 
# and ** (unpacking operator), 
# that lets you pass a variable number 
# of arguments to a function.

# By convention, these are written as *args and **kwargs, but only the asterisks are essential; you could equally note *vars and **vars to achieve the same result.

def check_arguments(*args):
    print(f"These are the arguments {args}")
check_arguments(1, 2, 'hey')

def check_tuple(a,b):
    # Returns the sum of 'a' and 'b'
    return sum((a,b))

print(check_tuple(10,30))

def  check_keywordedarguments(**kwargs):
    print(kwargs)

check_keywordedarguments(name="Sarah", age=24)