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