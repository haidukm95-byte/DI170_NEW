#Accept a number from a user and
#create its multiplication table
#7 to 41
user_number=int(input("Pick a number: "))
numbers=range(11)
for number in numbers:
    print(f"{user_number}*{number}={user_number*number}")