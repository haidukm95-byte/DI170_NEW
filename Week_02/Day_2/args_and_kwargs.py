# *args **kwargs
def super_func(*args, **kwargs):
    total = 0
    for items in kwargs.values():
        total += items
    return sum(args) + total

print(super_func(1,2,3,4,5, num_1=5, num_2=10))

#Rule: params, *args, default parameters,
#**kwargs