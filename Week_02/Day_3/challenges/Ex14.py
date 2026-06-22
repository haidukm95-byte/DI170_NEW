#Exercise 14
#Instructions

#Write a function that returns the average 
# value in a dictionary (assume the values are 
# numeric):

dict_avg=({'a': 1,'b':2,'c':8,'d': 1})
total_sum=sum(dict_avg.values())
count=len(dict_avg)
average=total_sum/count
print(average)