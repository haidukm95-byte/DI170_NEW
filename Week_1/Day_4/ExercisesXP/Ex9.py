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


