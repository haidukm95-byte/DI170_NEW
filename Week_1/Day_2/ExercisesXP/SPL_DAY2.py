print("Exercise 1")
print("Hello world")
print("Hello world")
print("Hello world")
print("Hello world")

print("Exercise 2")
print((99^3)*8)

print("Exercise 3")
# 5 < 3 False
# 3 == 3 True
# 3 == "3" False, because 3 is an integer and "3" is a string
# "3" > 3 False, because "3" is a string and 3 is an integer
# "Hello" == "hello" False

a=5
b=3
c="3"
d="Hello"
e="hello"
print(5 < 3)
print(3 == 3)
print(3 == "3")
print("TypeError: '>' not supported between instances of 'str' and 'int'")
print("Hello"=="Hello")

print("Exercise 4")
computer_brand="Lenovo ThinkPad T430"
print(f"I have a {computer_brand} computer.")

print("Exercise 5")
name='Marko'
age=30
shoe_size=44
info=f"My name is {name}, I am {age} years old and I wear {shoe_size}-sized shoes."
print(info)

print("Exercise 6")
aa=int(input("Type value A "))
bb=int(input("Now type value B "))
if aa > bb:
    print("Hello World")

print("Exercise 7")
nmb=int(input("Type any number here "))
if nmb % 2 == 0:
    print(f"The number {nmb} is EVEN.")
else: 
    print(f"The number {nmb} is ODD.")

print("Exercise 8")
init_name="Mark"
init_name_1="Marko"
input_name=input("Hello! What is your name? ")
if input_name == init_name or input_name == init_name_1:
    print("Well, you bear same name as this primitive code creator!")
else:
    print("Well, glad to see you. But you don`t bear same name as mine.")

print("Exercise 9")
growth=int(input("Hello! How high do you stand? (cm) "))
if growth>145:
    print("You stand high enough to rollercoast! Welcome and enjoy!")
else:
    print("Unfortunately, you are not tall enough to be permitted for rollercoasting.")