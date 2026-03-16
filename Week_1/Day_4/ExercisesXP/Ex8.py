p=10 #basic price $10
tp=2.5 #topping price
while True:
    top=input("What a pizza topping would you like to select? ")
    if top!="quit":
        print(f"Adding {top} to your pizza")
        p=p+tp
        print(f"${p}")
        continue
    print(f"Your bill is ${p}. Bon appetite!")
    break