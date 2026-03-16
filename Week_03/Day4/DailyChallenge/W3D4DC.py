import math

PI=math.pi
print('Welcome to the circles creator!')
unit=input('Which measurement unit do you prefer: ')
print("The standart input value is a radius")

class Circle:
    def __init__(self,x):
        self.x=x
        
    def area_r(self):
        return f'The circle`s area calculated by radius is {PI*self.x*self.x} sq {unit}'
        
    def area_d(self):
        return f'The circle`s area calculated by diameter is {PI*self.x*2*self.x*2/4} sq {unit}'
    
    def __repr__(self):
        return f'Circle`s radius is {self.x} {unit}, diameter is {self.x*2} {unit}'
    

    def __add__(self, other):
        if isinstance(other, Circle):
            print(f'New C circle`s radius is {self.x+other.x} {unit}.')
            return Circle(self.x + other.x)
        else:
            return NotImplemented
    
    def __gt__(self,other):
        if isinstance(other, Circle):
            if self.x>other.x:
                print(f'A circle`s radius is {self.x-other.x} {unit} bigger than B circle`s radius.')
                print(f'A circle`s diameter is {self.x*2-other.x*2} {unit} bigger than B circle`s diameter.')     
                print(f'A circle`s area is {PI*self.x*self.x-PI*other.x*other.x} sq {unit} bigger than B circle`s area.') 
            elif self.x<other.x:
                print(f'B circle`s radius is {other.x-self.x} {unit} bigger than A circle`s radius.')
                print(f'B circle`s diameter is {other.x*2-self.x*2} {unit} bigger than A circle`s diameter.')
                print(f'B circle`s area is {PI*other.x*other.x-PI*self.x*self.x} sq {unit} bigger than A circle`s area.') 
            else:
                print('A circle is equal to B circle')
        else:
            return NotImplemented

    def __eq__(self, other):
        if isinstance(other, Circle):
            if self.x==other.x:
                print('A circle is equal to B circle')
            else:
                print('A circle is not equal to B circle')
        else:
            return NotImplemented
        
    def __lt__(self, other):
        if isinstance(other, Circle):
            return self.x > other.x

aaa=Circle(20)
bbb=Circle(18)

print('1. Compute the circle’s area.')
print(aaa.area_r())
print(aaa.area_d())
print(bbb.area_r())
print(bbb.area_d())

print('2. Print the attributes of the circle — use a dunder method (__str__ or __repr__).')
print(repr(aaa))
print(repr(bbb))

print('3. Add two circles together and return a new circle with the new radius — use a dunder method (__add__).')
ccc=aaa.__add__(bbb)
print(ccc)

print('4. Compare two circles to see which is bigger — use a dunder method (__gt__).')
aaa.__gt__(bbb)

print('5. Compare two circles to check if they are equal — use a dunder method (__eq__).')
aaa.__eq__(bbb)

print('6. Store multiple circles in a list and sort them — implement __lt__ or other comparison methods.')
ddd=Circle(9)
eee=Circle(28)
fff=Circle(17)

print('Sorted list of circles:')

circles_list=[
    Circle(18),
    Circle(29),
    Circle(4),
    Circle(6),
    Circle(20)
]

circles_list.sort()
print(circles_list)




