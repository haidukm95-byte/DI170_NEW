# Exercise 1: Currencies

# Goal: Implement dunder methods for a Currency class to handle string representation, 
# integer conversion, addition, and in-place addition.

class Currency:
    def __init__(self, currency, amount):
        self.currency = currency
        self.amount = amount
    

    def __repr__(self):
        if self.amount>1:
            return f'{self.amount} {self.currency}s'
        else:
            return f'{self.amount} {self.currency}'
        
    def __int__(self):
        return self.amount
    
    def __add__(self, other):
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            return self.amount + other.amount
        elif isinstance(other, int):
            return self.amount + other
        else:
            raise TypeError(f"Cannot add Currency with {type(other)}")
    
    def __iadd__(self, other):
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            self.amount += other.amount
        elif isinstance(other, int):
            self.amount += other
        else:
            raise TypeError(f"Cannot add Currency with {type(other)}")
        return self

c1 = Currency('dollar', 5)
c2 = Currency('dollar', 10)
c3 = Currency('shekel', 1)
c4 = Currency('shekel', 10)

print(c1)
print(int(c1))
print(repr(c1))
print(c1 + 5)
# the output has to be 10
print(c1 + c2)
# the output has to be 15
print(c1)
c1 += 5
print(c1)
# the output has to be 10
c1 += c2
print(c1)
# the output has to be 20

print(c1+c3)

