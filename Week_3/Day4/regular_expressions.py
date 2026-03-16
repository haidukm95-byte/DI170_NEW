import re

pattern = re.compile('search this inside of this text please')
string = 'search this inside of this text please. Marko'
aaa='the text is for testing'

# This engine is made to search the pieces of text in 
# the string. The True value says us that
# this piece of text is present there
print('search' in string)
print('inside of' in string)

a = re.search('this', string)
b = re.search('testing', aaa)

print(a.span()) # prints out a span where the word is located
print(a.start()) # prints out a starting position of the word
print(a.group()) # prints out the whole word
# if there are few same words in the text,
#it will print out only one word as displaying of the whole group

c=pattern.search(string)
d=pattern.findall(string)
e=pattern.fullmatch(string) #checks the full match of both strings
f=pattern.match(string) #checks the partial match of both strings
print(c)
print(d)
print(e)
print(f)