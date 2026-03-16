for letter in 'Leonardo':
    if letter == 'a':
        break
    print(letter, end='') # end='' renders each letter next to the other

for letter in 'Leonardo':
    if letter == 'o':
        continue
    print(letter, end='') # dont execute for 'o' letter

while True:
    s = input('Enter something : ')
    if s == 'quit':
        break
    if len(s) < 3:
        print('Too small')
        continue
    print('Input is of sufficient length')

    for item in [1,2,3]:
        pass # to avoid the error

print('Finish the script')