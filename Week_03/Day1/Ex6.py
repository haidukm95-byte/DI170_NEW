# Given a list of numbers, write a function that returns the sum of every number. BUT you can have a malicious string inside the list.

my_list = [2,3,1,2,"four",42,1,5,3,"imanumber"]

def addit(num_list):
    total=0
    for num in num_list:
        try:
            total+=num
        except:
            pass
    
    return total

print(addit(my_list))
