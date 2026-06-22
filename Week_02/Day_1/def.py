def say_hello():
    #The sentence below
    # is Docstring
    '''A function that says hello'''
    print("Hello!")
say_hello()

def say_hello(username):
    print(f"Hello {username}")
say_hello("Rick") # "Rick" is an argument
# output "Hello Rick"

say_hello("Morty") # "Morty" is an argument
# output "Hello Morty"
say_hello('Marko')

#Example of a function that accept more than one argument
print('''
Example of a function that accept more than one argument
''')
def say_hello(username, language):
    if language == "EN":
        print("Hello "+username)
    elif language == "FR":
        print("Bonjour "+username)
    else:
        print("This language is not supported: " + language)

say_hello("Rick", "FR")
say_hello("Rick", "EN")

print('''
3. Keyword arguments
''')
def say_hello(username, language):
    if language == "EN":
        print("Hello "+username)
    elif language == "FR":
        print("Bonjour "+username)
    else:
        print("This language is not supported: " + language)

say_hello(username="Rick", language="FR")

say_hello(input('name? '), input('language? '))
# >>> Hello Marko

print('''
4. Default values
''')
def say_hello(username, language="EN"):
    if language == "EN":
        print("Hello "+username)
    elif language == "FR":
        print("Bonjour "+username)
    else:
        print("This language is not supported: " + language)

say_hello("Rick")
# OR
say_hello(username="Rick")

say_hello('Marko', 'EN')