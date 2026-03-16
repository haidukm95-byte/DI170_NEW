# Rather than breaking out of a loop entirely without executing the rest of its code, 
# you can use the continue statement to return to the beginning of the loop. 

current_number = 0
while current_number <= 10:
    current_number += 1
    if 3 < current_number < 7: # If the number is between 3 and 7 
        continue                # Go back to the beginning of the loop
    print(current_number)

