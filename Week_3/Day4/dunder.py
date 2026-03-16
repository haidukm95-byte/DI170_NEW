class Toy():
    def __init__(self, color, age):
        self.color=color
        self.age=age
        self.my_dict={
            'name': 'Yoyo',
            'has_pets': False
        }
    
    def __str__(self):
        return f'{self.color}'

    def __len__(self):
        return 5
    
    def __call__(self):
        return('yess??')
    
    def __getitem__(self, i):
        return self.my_dict[i]
    
action_figure=Toy('red', 0)
print(action_figure.__str__())
print(str(action_figure))
print(len(action_figure))
#The __call__ function is actual for calling an instance as stated below:
print(action_figure())
# The __str__ was defined to output self.color in both cases: 
# action figure.__str__() and str(action_figure)

# Here is how __getitem__ is output. 
# We just state the dictonary`s key to print the value
print(action_figure['name'])


