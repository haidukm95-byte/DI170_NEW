class calc:
    def add(x,y):
        answer = x+y
        print(answer)
    def sub(x,y):
        answer=x-y
        print(answer)
    def mult(x,y):
        answer=x*y
        print(answer)
    def div(x,y):
        answer=x/y
        print(answer)

n1=int(input('Pick a number #1 here: '))
operation=input('What operation do you want to perform? +-*/ ')
n2=int(input('Pick a number #2 here: '))
if operation=='+':
    calc.add(n1,n2)
if operation=='-':
    calc.sub(n1,n2)
if operation=='*':
    calc.mult(n1,n2)
if operation=='/':
    calc.div(n1,n2)
