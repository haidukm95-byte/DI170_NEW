#Exercise 1
print("Exercise 1: Favorite Numbers")
my_fav_numbers = [22, 47, 418, 8, 52]
print(my_fav_numbers)
my_fav_numbers.extend([78, 42])
print(my_fav_numbers)
friend_fav_numbers = [3, 56, 354, 65]
our_fav_numbers = my_fav_numbers + friend_fav_numbers
print(our_fav_numbers)

#Exercise 2
print("Exercise 2: Tuple")
my_tuple = (8,15,29)
#my_tuple.extend(33, 75)
print(my_tuple)
#AttributeError: 'tuple' object has no attribute 'extend'

#Exercise 3
print("Exercise 3: List Manipulation")
basket = ["Banana", "Apples", "Oranges", "Blueberries"]
print(basket)
basket.remove("Banana")
print(basket)
basket.remove("Blueberries")
print(basket)
basket.append("Kiwi")
print(basket)
basket.insert(0, "Apples")
print(basket)
apple_count=basket.count("Apples")
if apple_count == 1:
    print("Apples appear in the basket only once")
elif apple_count == 2:
    print("Apples appear in the basket twice")
else:
    print(f"Apples appear in the basket {apple_count} times.")
basket.clear()
print(basket)

#Exercise 4
start = 1.5
stop = 5
step = 0.5
while start <= stop:
    print(start)
    start=start+step

#Exercise 5
print("Exercise 5: For Loop")
for x in range(1,20):
    print(x)
for x in range(2,20,2):
    print(x)

#Exercise 6
print("Exercise 6: While Loop")
while True:
    user_name = input("Please enter your name: ")
    if user_name.isdigit():
        print("A name cannot be just digits. Please try again.")
        continue  # Skip the rest of the loop and start the next iteration

    # Check if the name is at least 3 letters long
    if len(user_name) < 3:
        print("Name must be at least 3 characters long. Please try again.")
        continue  # Skip the rest of the loop and start the next iteration

    # If the input is correct, print “thank you” and break the loop
    print("Thank you")
    break

#Exercise 7
fav_fruits=["Mango", "Orange", "Apple"]
fruits=input("Please enter your favourite fruits: ")
if fruits is fav_fruits:
    print("You chose one of your favorite fruits! Enjoy!")
else:
    print("You chose a new fruit. I hope you enjoy it!")
#Question: how can I determine a condition when several fruits are input separated by spaces?

#Exercise 8: Pizza Toppings
print("Exercise 8: Pizza Toppings")
p=10 #basic price $10
tp=2.5 #topping price
while True:
    top=input("What a pizza topping would you like to select? ")
    if top!="quit":
        print(f"Adding {top} to your pizza")
        p=p+tp
        continue
    print(f"Your bill is ${p}. Bon appetite!")
    break

#Exercise 9
print("Exercise 9: Cinemax Tickets")
print("Welcome to our cinema! Here`s our price list: \n0 to 3 are free\n3 to 12: $10\nOver 12: $15")
toddlers=0
children=10
over12=15
acc=0
yn="Do you wish to continue? "
while True:
    age_initial=input("What is your age? ")
    if int(age_initial)>=0 and int(age_initial)<3:
        acc=acc+0
        yn=input("Do you wish to continue? y/n ")
        if yn=="y":
            continue
        else:
            print(f"Your total bill is ${acc}. Enjoy watching!")
            break
    if int(age_initial)>=3 and int(age_initial)<12:
        acc=acc+10
        yn=input("Do you wish to continue? y/n ")
        if yn=="y":
            continue
        else:
            print(f"Your total bill is ${acc}. Enjoy watching!")
            break
    else:
        acc=acc+15
        yn=input("Do you wish to continue? y/n ")
        if yn=="y":
            continue
        else:
            print(f"Your total bill is ${acc}. Enjoy watching!")
            break



    



    